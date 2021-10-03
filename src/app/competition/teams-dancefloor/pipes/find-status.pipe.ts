import {Pipe, PipeTransform} from '@angular/core';
import {DanceOffPair} from '../model/danceoff';

@Pipe({
  name: 'findStatus'
})
export class FindStatusPipe implements PipeTransform {

  transform(id: number, danceOffs: DanceOffPair[]): 'W' | 'L' | null {
    if (!!danceOffs && danceOffs.length > 0) {
      const selected = danceOffs.filter(doff => doff.opponents.includes(id));
      if (selected.length === 1) {
        return selected[0].winner === id ? 'W' : 'L';
      }
    }
    return null;
  }

}
