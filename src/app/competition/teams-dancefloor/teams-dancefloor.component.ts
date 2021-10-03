import {takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Team} from './model/team';
import {Opponent, OpponentsMap} from './model/opponent';
import {DanceOffPair} from './model/danceoff';
import {TeamsService} from '../services/teams.service';
import {TeamRobotSignature} from '../../shared/robot/model/robot';
import {OpponentsComponent} from '../../shared/modals/opponents.component';
import {DanceOffService} from '@src/app/competition/services/dance-off.service';
import {StatusService} from '@src/app/services/status.service';
import {Status} from '@src/app/status';

@Component({
  selector: 'app-teams-dancefloor',
  templateUrl: './teams-dancefloor.component.html',
  styleUrls: ['./teams-dancefloor.component.css']
})
export class TeamsDancefloorComponent implements OnInit, OnDestroy {

  teams$: Observable<Team[]>;
  modalPanelNotifier = new Subject();
  opponents$: Observable<OpponentsMap>;
  activePair$: Observable<number[]>;
  danceOffs$: Observable<DanceOffPair[]>;
  status$: Observable<Status>;

  constructor(private teamsService: TeamsService,
              private danceOffService: DanceOffService,
              private statusService: StatusService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.status$ = this.statusService.status$;
    this.teams$ = this.teamsService.teams$;
    this.opponents$ = this.teamsService.opponentsPerTeam$;
    this.activePair$ = this.danceOffService.activePair$;
    this.danceOffs$ = this.danceOffService.danceOffs$;
  }

  danceOff(): void {
    this.danceOffService.danceOff();
  }

  competeAgain(): void {
    this.danceOffService.init(true);
  }

  pickOpponent(signature: TeamRobotSignature, opponents: OpponentsMap): void {
    this.openOpponentsDialog(signature.robotID, opponents[signature.teamName]);
  }

  private openOpponentsDialog(robotID: number, opponents: Opponent[]): void {
    const dialogRef = this.dialog.open(OpponentsComponent, {
      width: '250px',
      disableClose: true,
      data: {title: 'Opponents', opponents}
    });
    dialogRef.afterClosed().pipe(takeUntil(this.modalPanelNotifier))
      .subscribe(opponentID => {
        this.danceOffService.setActivePair([robotID, opponentID]);
      });
  }

  ngOnDestroy(): void {
    this.modalPanelNotifier.next();
    this.modalPanelNotifier.complete();
  }
}
