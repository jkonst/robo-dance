import {CompetitionComponent} from '@src/app/competition/competition.component';
import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CompetitionGuard} from '@src/app/competition/competition-guard';
import {LeaderBoardComponent} from '@src/app/competition/leader-board/leader-board.component';
import {LeaderBoardGuard} from '@src/app/competition/leader-board.guard';

const routes: Routes = [
  {
    path: '',
    component: CompetitionComponent,
    canActivate: [CompetitionGuard],
    children: [
      {
        path: 'board',
        component: LeaderBoardComponent,
        canActivate: [LeaderBoardGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export  class  CompetitionRoutingModule {}
