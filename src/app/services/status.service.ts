import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Status} from '../status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private statusSubject: BehaviorSubject<Status> =
    new BehaviorSubject<Status>(Status.NOT_STARTED);
  status$: Observable<Status> = this.statusSubject.asObservable();
  private statusHistorySubject: BehaviorSubject<Status[]> =
    new BehaviorSubject<Status[]>([Status.NOT_STARTED]);
  statusHistory$: Observable<Status[]> = this.statusHistorySubject.asObservable();

  init(): void {
    this.statusSubject.next(Status.NOT_STARTED);
    this.statusHistorySubject.next([Status.NOT_STARTED]);
  }

  setStatus(status: Status): void {
    this.statusSubject.next(status);
    const history = [...this.statusHistorySubject.getValue()];
    this.statusHistorySubject.next([...history, status]);
  }
}
