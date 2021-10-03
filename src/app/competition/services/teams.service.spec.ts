import {TestBed} from '@angular/core/testing';

import {TeamsService} from './teams.service';
import {Team} from '@src/app/competition/teams-dancefloor/model/team';
import {MessagesService} from '@src/app/shared/messages/messages.service';
import {dummyRobots} from '@src/app/competition/services/robots-data';

class MessagesServiceStub {

  showErrors(...errors: string[]): void {
  }
}

describe('TeamsService', () => {
  let service: TeamsService;
  const demoTeams: Team[] = [{
    name: 'A-team',
    robots: []
  }, {
    name: 'B-team',
    robots: []
  }];
  let myMessagesService: MessagesServiceStub;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TeamsService,
        {provide: MessagesService, useClass: MessagesServiceStub}
      ]
    });
    service = TestBed.inject(TeamsService);
    myMessagesService = TestBed.inject(MessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should init empty teams with filled status false and empty list of robots',
    (done) => {
    service.init();
    service.teams$.subscribe(teams => {
      expect(teams).toEqual([]);
      expect(teams.every(team => team.robots.length === 0)).toBeTruthy();
      done();
    });
  });

  it('should create 2 teams with name: `A-team` and `B-team`',
    (done) => {
    service.createTeams(demoTeams);
    service.teams$.subscribe(teams => {
      expect(teams.length).toBe(2);
      expect(teams[0].name).toBe('A-team');
      expect(teams[1].name).toBe('B-team');
      done();
    });
  });

  it('should compose teams of 5 robots', (done) => {
    service.init();
    service.createTeams(demoTeams);
    service.composeTeams(5, dummyRobots);
    service.teams$.subscribe(teams => {
      expect(teams.every(team => team.robots.length === 5)).toBeTruthy();
      done();
    });
  });

  it('should fail to compose teams of 5 robots because `Loaded robots size' +
    ' is not enough for composing a team of 5`', (done) => {
    jest.spyOn(myMessagesService, 'showErrors');
    service.init();
    service.createTeams(demoTeams);
    const eightDummyRobots = dummyRobots.slice(0, 9);
    service.composeTeams(5, eightDummyRobots);
    expect(myMessagesService.showErrors)
      .toHaveBeenCalledWith(new Error('Loaded robots size is not enough for composing a team of 5') as any);
    service.teams$.subscribe(teams => {
      expect(teams.every(team => team.robots.length === 0)).toBeTruthy();
      done();
    });
  });

  it('should fail to compose 2 teams of size 5`', (done) => {
    jest.spyOn(myMessagesService, 'showErrors');
    service.init();
    service.createTeams(demoTeams);
    const overExperiencedRobots = dummyRobots.map(robot => ({...robot, experience: 11}));
    service.composeTeams(5, overExperiencedRobots);
    expect(myMessagesService.showErrors)
      .toHaveBeenCalledWith(new Error('Failed to compose ' + demoTeams.length +
        ' teams of robots size: 5') as any);
    service.teams$.subscribe(teams => {
      expect(teams.every(team => team.robots.length === 0)).toBeTruthy();
      done();
    });
  });

});
