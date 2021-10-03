import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {LeaderBoardService} from '@src/app/competition/services/leader-board.service';

@Injectable({
  providedIn: 'any'
})
export class LeaderBoardGuard implements CanActivate {
  constructor(private leaderboardService: LeaderBoardService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.leaderboardService.setBoardActive(true);
    return true;
  }
}
