import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map, take, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {Robot} from '../../shared/robot/model/robot';
import {MessagesService} from '@src/app/shared/messages/messages.service';

@Injectable({
  providedIn: 'any'
})
export class RobotsDataService {
  private robotsSubject = new BehaviorSubject<Robot[]>([]);
  robots$: Observable<Robot[]> = this.robotsSubject.asObservable();

  loadRobots(): void {
    this.http.get<Robot[]>('/parkside/api/robots').pipe(
      take(1),
      map(res => res as Robot[]),
      map(robots => robots.filter(robot => !robot.outOfOrder)),
      tap(robots => this.robotsSubject.next(robots)),
      catchError(err => {
        const message = 'Could not load robots';
        this.messagesService.showErrors(message);
        return throwError(err);
      })
    ).subscribe();
  }

  constructor(private http: HttpClient, private messagesService: MessagesService) {
  }
}
