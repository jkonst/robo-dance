import {Pipe, PipeTransform} from '@angular/core';
import {Status} from '../../../status';

@Pipe({
  name: 'pendingDanceOff'
})
export class PendingDanceOffPipe implements PipeTransform {

  transform(status: Status): boolean {
    return status === Status.DANCE_OFFS_PENDING
      || status === Status.PENDING_POSTING_DANCEOFFS;
  }

}
