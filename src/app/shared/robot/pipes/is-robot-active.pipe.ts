import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isRobotActive'
})
export class IsRobotActivePipe implements PipeTransform {

  transform(id: number, ids: number[]): boolean {
    return !!ids && ids.includes(id);
  }

}
