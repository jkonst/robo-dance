import {Pipe, PipeTransform} from '@angular/core';
import {Status} from '@src/app/status';

@Pipe({
  name: 'pendingPostingDanceoffs'
})
export class PendingPostingDanceoffsPipe implements PipeTransform {

  transform(status: Status): boolean {
    return status === Status.PENDING_POSTING_DANCEOFFS;
  }

}
