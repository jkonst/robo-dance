import {Pipe, PipeTransform} from '@angular/core';
import {Status} from '@src/app/status';

@Pipe({
  name: 'isLeaderboardActive'
})
export class IsLeaderboardActivePipe implements PipeTransform {

  transform(statusHistory: Status[]): boolean {
    return statusHistory.includes(Status.COMPETITION_COMPLETED);
  }

}
