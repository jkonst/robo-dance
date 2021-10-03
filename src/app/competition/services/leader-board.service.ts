import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Robot} from '@src/app/shared/robot/model/robot';

@Injectable({
  providedIn: 'any'
})
export class LeaderBoardService {
  private isBoardActiveSubject = new BehaviorSubject<boolean>(false);
  isBoardActive$: Observable<boolean> = this.isBoardActiveSubject.asObservable();
  private robotsSubject = new BehaviorSubject<Robot[]>([]);
  robots$: Observable<Robot[]> = this.robotsSubject.asObservable();

  setBoardActive(isActive: boolean): void {
    this.isBoardActiveSubject.next(isActive);
  }

  setRobots(robots: Robot[]): void {
    this.robotsSubject.next(robots.slice());
  }
}
