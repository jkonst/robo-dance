import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
  selector: 'app-dance-off-status',
  templateUrl: './dance-off-status.component.html',
  styleUrls: ['./dance-off-status.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DanceOffStatusComponent {
  @Input()
  status: 'W' | 'L' | null;

}
