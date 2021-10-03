import {ChangeDetectionStrategy, EventEmitter, Component, Input, Output} from '@angular/core';
import {Robot} from '../robot/model/robot';
import {DanceOffPair} from '../../competition/teams-dancefloor/model/danceoff';

@Component({
  selector: 'app-robot',
  templateUrl: './robot.component.html',
  styleUrls: ['./robot.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RobotComponent {

  @Input()
  robot: Robot;
  @Input()
  activePair: number[];
  @Input()
  danceOffs: DanceOffPair[];

  @Output()
  pickOpponentEvent = new EventEmitter<number>();

}
