import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {TeamsService} from '../../services/teams.service';
import {Robot} from '../../../shared/robot/model/robot';

@Component({
  selector: 'app-teams-composer',
  templateUrl: './teams-composer.component.html',
  styleUrls: ['./teams-composer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamsComposerComponent implements OnInit {
  @Input()
  robots: Robot[];
  @Input()
  noOfRobots: number;
  filling = false;
  isFilled$: Observable<boolean>;

  constructor(private teamsService: TeamsService) {
  }

  ngOnInit(): void {
    this.isFilled$ = this.teamsService.teams$.pipe(
      map(teams => teams.reduce((acc, curr) =>
        acc && curr.robots.length === this.noOfRobots, true),
      )
    );
  }

  fillTeams(): void {
    this.filling = true;
    setTimeout(() => {
      this.teamsService.composeTeams(this.noOfRobots, this.robots);
      this.filling = false;
    }, 2000);
  }
}
