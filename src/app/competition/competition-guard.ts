import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {StatusService} from '@src/app/services/status.service';
import {Status} from '@src/app/status';
import {RobotsDataService} from '@src/app/competition/services/robots-data.service';
import {TeamsService} from '@src/app/competition/services/teams.service';
import {DanceOffService} from '@src/app/competition/services/dance-off.service';
import {take} from 'rxjs/operators';
import {LeaderBoardService} from '@src/app/competition/services/leader-board.service';

@Injectable({
  providedIn: 'any'
})
export class CompetitionGuard implements CanActivate {
  constructor(
    private router: Router,
    private statusService: StatusService,
    private robotsDataService: RobotsDataService,
    private teamsService: TeamsService,
    private leaderboardService: LeaderBoardService,
    private danceOffService: DanceOffService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (state.url === '/competition/board') {
      // check status history to understand whether leaderboard must be loaded
      this.statusService.statusHistory$.pipe(take(1)).subscribe(history => {
        if (!history.includes(Status.COMPETITION_COMPLETED)) {
          this.router.navigateByUrl('/competition');
        }
      });
    } else {
      this.leaderboardService.setBoardActive(false);
      this.statusService.setStatus(Status.COMPETITION_STARTED);
      this.teamsService.init();
      this.danceOffService.init();
      this.robotsDataService.loadRobots();
    }
    return true;
  }

}
