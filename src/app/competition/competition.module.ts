import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {CompetitionComponent} from './competition.component';
import {TeamsCreatorComponent} from './teams-creator/teams-creator.component';
import {TeamComponent} from './teams-dancefloor/team/team.component';
import {TeamsDancefloorComponent} from './teams-dancefloor/teams-dancefloor.component';
import {CompetitionRoutingModule} from './competition.routing.module';
import {FilterFilledTeamsPipe} from './teams-dancefloor/pipes/filter-filled-teams.pipe';
import {TeamsComposerComponent} from './teams-creator/teams-composer/teams-composer.component';
import {ToCompeteAgainPipe} from './teams-dancefloor/pipes/to-compete-again.pipe';
import {PendingDanceOffPipe} from './teams-dancefloor/pipes/pending-dance-off.pipe';
import {PendingPostingDanceoffsPipe} from './teams-dancefloor/pipes/pending-posting-danceoffs.pipe';
import {SharedModule} from '../shared/shared.module';
import {LeaderBoardComponent} from '@src/app/competition/leader-board/leader-board.component';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {DanceOffStatusComponent} from '@src/app/competition/teams-dancefloor/dance-off-status/dance-off-status.component';
import {FindStatusPipe} from '@src/app/competition/teams-dancefloor/pipes/find-status.pipe';

@NgModule({
  declarations: [
    CompetitionComponent,
    TeamsCreatorComponent,
    TeamsComposerComponent,
    LeaderBoardComponent,
    TeamsDancefloorComponent,
    DanceOffStatusComponent,
    TeamComponent,
    FilterFilledTeamsPipe,
    ToCompeteAgainPipe,
    PendingDanceOffPipe,
    PendingPostingDanceoffsPipe,
    FindStatusPipe
  ],
  imports: [
    CommonModule,
    CompetitionRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ]
})
export class CompetitionModule {
}
