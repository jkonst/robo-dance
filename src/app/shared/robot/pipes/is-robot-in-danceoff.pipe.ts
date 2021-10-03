import {Pipe, PipeTransform} from '@angular/core';
import {DanceOffPair} from '../../../competition/teams-dancefloor/model/danceoff';

@Pipe({
  name: 'isRobotInDanceoff'
})
export class IsRobotInDanceoffPipe implements PipeTransform {

  transform(id: number, danceOffs: DanceOffPair[]): boolean {
    if (!!danceOffs && danceOffs.length > 0) {
      const danceOffers = danceOffs.reduce((acc, curr) =>
        [...acc, curr.opponents], []);
      return [].concat.apply([], danceOffers).includes(id);
    }
    return false;
  }

}
