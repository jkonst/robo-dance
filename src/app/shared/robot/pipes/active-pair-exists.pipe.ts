import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'activePairExists'
})
export class ActivePairExistsPipePipe implements PipeTransform {

  transform(activePair: number[]): boolean {
    return !!activePair && activePair.length === 2;
  }

}
