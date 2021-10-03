import {Pipe, PipeTransform} from '@angular/core';
import {Status} from '@src/app/status';

@Pipe({
  name: 'toCompeteAgain'
})
export class ToCompeteAgainPipe implements PipeTransform {

  transform(status: Status): boolean {
    return status === Status.COMPETITION_COMPLETED ||
      status === Status.ERROR_POSTING_DANCEOFFS;
  }

}
