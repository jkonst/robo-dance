import { Pipe, PipeTransform } from '@angular/core';
import {Team} from '../model/team';

@Pipe({
  name: 'filterFilledTeams'
})
export class FilterFilledTeamsPipe implements PipeTransform {

  transform(teams: Team[]): boolean {
    return teams.length > 0 && teams.every(team => team.robots.length > 0);
  }

}
