import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Team} from '../teams-dancefloor/model/team';
import {OpponentsMap} from '../teams-dancefloor/model/opponent';
import {flattenTeamRobots, getRandomInt} from '../../shared/utils/helper';
import {Robot, TeamRobot} from '../../shared/robot/model/robot';
import {MessagesService} from '../../shared/messages/messages.service';
import {Status} from '../../status';
import {StatusService} from '../../services/status.service';

@Injectable({
  providedIn: 'any'
})
export class TeamsService {
  private teamsSubject = new BehaviorSubject<Team[]>([]);
  teams$: Observable<Team[]> = this.teamsSubject.asObservable();
  MAX_TEAM_EXP = 50;
  private opponentsPerTeamSubject = new BehaviorSubject<OpponentsMap>({});
  opponentsPerTeam$: Observable<OpponentsMap> =
    this.opponentsPerTeamSubject.asObservable();

  constructor(private messagesService: MessagesService,
              private statusService: StatusService) {
  }

  init(): void {
    this.createTeams([]);
  }

  createTeams(teams: Team[]): void {
    this.teamsSubject.next(teams.map(team => ({...team})));
  }

  initiateOpponents(): void {
    const teams = this.teamsSubject.getValue().map(team => ({...team}));
    const allTeamsRobots: TeamRobot[] = flattenTeamRobots(teams);
    const opponentsMap: OpponentsMap = teams.reduce((acc, cur) => {
      return {
        ...acc, [cur.name]: allTeamsRobots
          .filter(teamRobot => teamRobot.teamName !== cur.name)
          .map(teamRobot => ({id: teamRobot.id, name: teamRobot.name}))
      };
    }, {});
    this.opponentsPerTeamSubject.next(opponentsMap);
  }

  removeOpponents(opponentIDs: number[]): void {
    const opponentsMap: OpponentsMap = {...this.opponentsPerTeamSubject.getValue()};
    Object.keys(opponentsMap).forEach(teamName => {
      const opponents =  opponentsMap[teamName]
        .filter(opponent => !opponentIDs.includes(opponent.id));
      opponentsMap[teamName] = [...opponents];
    });
    this.opponentsPerTeamSubject.next(opponentsMap);
  }

  composeTeams(noOfRobots: number, robots: Robot[]): void {
    try {
      this.fillTeamsWithRobots(noOfRobots, robots);
      this.statusService.setStatus(Status.DANCE_OFFS_PENDING);
      this.initiateOpponents();
    } catch (error) {
      this.messagesService.showErrors(error);
    }
  }

  private fillTeamsWithRobots(robotsTeamSize: number, robots: Robot[]): void {
    const teams = [...this.teamsSubject.getValue().map(team => ({...team}))];
    try {
      this.assignRobotsRandomly(robotsTeamSize, teams, robots);
    } catch (error) {
      throw error;
    }
    const isEveryTeamFilled = teams.every(team => team.robots.length === robotsTeamSize);
    if (isEveryTeamFilled) {
      this.teamsSubject.next(teams);
    } else {
      throw new Error('Failed to compose ' + teams.length + ' teams of robots size: '
        + robotsTeamSize);
    }
  }

  private assignRobotsRandomly(robotsTeamSize: number,
                               teams: Team[],
                               robots: Robot[],
                               maxRetries?: number): void {
    maxRetries = !maxRetries ? 100 : maxRetries;
    let tempRobots = robots.slice();
    teams.forEach(team => {
      let robotsForTeam: Robot[] = [];
      if (robotsTeamSize <= tempRobots.length) {
        let count = 1;
        while (count < maxRetries) {
          for (let i = 1; i <= robotsTeamSize; i++) {
            const idx = getRandomInt(0, tempRobots.length - 1);
            robotsForTeam = [...robotsForTeam, tempRobots.splice(idx, 1)[0]];
          }
          const teamTotalExperience = robotsForTeam
            .reduce((acc, cur) => acc + cur.experience, 0);
          if (teamTotalExperience <= this.MAX_TEAM_EXP) {
            team.robots = robotsForTeam.slice();
            break;
          } else {
            tempRobots = [...tempRobots].concat(robotsForTeam.slice());
            robotsForTeam = [];
            count++;
          }
        }
      } else {
        throw new Error('Loaded robots size is not enough for composing a team of '
          + robotsTeamSize);
      }
    });
  }
}
