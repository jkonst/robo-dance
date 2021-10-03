import {Injectable} from '@angular/core';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {TeamsService} from '@src/app/competition/services/teams.service';
import {Team} from '@src/app/competition/teams-dancefloor/model/team';

@Injectable({
  providedIn: 'any'
})
export class ValidatorService {
  teams: Team[];
  constructor(private teamsService: TeamsService) {
    this.teamsService.teams$.subscribe(teams => this.teams = teams);
  }

  duplicateTeamNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }
      if (this.teams.findIndex(team => team.name === value) !== -1) {
        return {duplicateName: true};
      }
    };
  }

}
