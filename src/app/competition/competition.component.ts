import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {RobotsDataService} from './services/robots-data.service';
import {TeamsService} from './services/teams.service';
import {Robot} from '../shared/robot/model/robot';
import {Team} from '@src/app/competition/teams-dancefloor/model/team';
import {LeaderBoardService} from '@src/app/competition/services/leader-board.service';

@Component({
  selector: 'app-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.css']
})
export class CompetitionComponent implements OnInit {
  robots$: Observable<Robot[]>;
  teams$: Observable<Team[]>;
  isBoardActive$: Observable<boolean>;

  constructor(
    private robotsDataService: RobotsDataService,
    private teamsService: TeamsService,
    private leaderBoardService: LeaderBoardService) {
  }

  ngOnInit(): void {
    this.robots$ = this.robotsDataService.robots$;
    this.teams$ = this.teamsService.teams$;
    this.isBoardActive$ = this.leaderBoardService.isBoardActive$;
  }

}
