import { Injectable } from '@angular/core';
import {filter} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private errorsSubject = new BehaviorSubject<string[]>([]);
  errors$: Observable<string[]> = this.errorsSubject.asObservable().pipe(
    filter(messages => messages && messages.length > 0
      && messages.every(msg => !!msg))
  );

  showErrors(...errors: string[]): void {
    this.errorsSubject.next(errors);
  }

  cleanErrors(): void {
    this.errorsSubject.next([]);
  }
}
