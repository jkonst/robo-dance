import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TeamsService} from '../services/teams.service';
import {ValidatorService} from '../services/validator.service';
import {emptyTeam, Team} from '../teams-dancefloor/model/team';
import {Robot} from '../../shared/robot/model/robot';

@Component({
  selector: 'app-teams-creator',
  templateUrl: './teams-creator.component.html',
  styleUrls: ['./teams-creator.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamsCreatorComponent implements OnInit {
  @Input()
  teamsNo: number;
  @Input()
  robots: Robot[];
  @Input()
  teams: Team[] = [];

  form: FormGroup;

  constructor(private fb: FormBuilder, private teamsService: TeamsService, private validatorService: ValidatorService) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.fb.control('',
        [Validators.required, this.validatorService.duplicateTeamNameValidator()])
    }, {
      updateOn: 'change'
    });
  }

  addTeam(): void {
    const team = {...emptyTeam, name: this.form.get('name').value};
    const teams = this.teams.slice();
    this.teamsService.createTeams([...teams, team]);
    this.form.get('name').patchValue('');
  }
}
