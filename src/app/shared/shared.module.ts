import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MessagesComponent} from './messages/messages.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {RobotComponent} from './robot/robot.component';
import {OpponentsComponent} from './modals/opponents.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { ActivePairExistsPipePipe } from './robot/pipes/active-pair-exists.pipe';
import { IsRobotActivePipe } from './robot/pipes/is-robot-active.pipe';
import { IsRobotInDanceoffPipe } from './robot/pipes/is-robot-in-danceoff.pipe';
import { DanceOffStatusComponent } from '../competition/teams-dancefloor/dance-off-status/dance-off-status.component';
import { FindStatusPipe } from '../competition/teams-dancefloor/pipes/find-status.pipe';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    RobotComponent,
    MessagesComponent,
    OpponentsComponent,
    ActivePairExistsPipePipe,
    IsRobotActivePipe,
    IsRobotInDanceoffPipe,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule
  ],
  exports: [
    RobotComponent,
    MatCardModule,
    MessagesComponent,
    MatFormFieldModule,
    IsRobotInDanceoffPipe,
    IsRobotActivePipe,
    HttpClientModule,
    MatButtonModule
  ]
})
export class SharedModule {
}
