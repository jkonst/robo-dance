import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {DanceOffPair} from '../model/danceoff';
import {Team} from '../model/team';
import {TeamRobotSignature} from '../../../shared/robot/model/robot';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamComponent {

  @Input()
  team: Team;
  @Input()
  activePair: number[];
  @Input()
  danceOffs: DanceOffPair[];

  @Output()
  pickOpponentEvent = new EventEmitter<TeamRobotSignature>();

  pickOpponent($event: number): void {
    this.pickOpponentEvent.emit({teamName: this.team.name, robotID: $event});
  }
}
