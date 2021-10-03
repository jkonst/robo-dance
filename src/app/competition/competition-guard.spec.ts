import {TestBed} from '@angular/core/testing';

import {CompetitionGuard} from './competition-guard';
import {Router, RouterStateSnapshot} from '@angular/router';
import {Location} from '@angular/common';
import {StatusService} from '@src/app/services/status.service';
import {Observable} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';
import {CompetitionComponent} from '@src/app/competition/competition.component';
import {TeamsCreatorComponent} from '@src/app/competition/teams-creator/teams-creator.component';
import {MessagesComponent} from '@src/app/shared/messages/messages.component';
import {TeamsDancefloorComponent} from '@src/app/competition/teams-dancefloor/teams-dancefloor.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {TeamsComposerComponent} from '@src/app/competition/teams-creator/teams-composer/teams-composer.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {FilterFilledTeamsPipe} from '@src/app/competition/teams-dancefloor/pipes/filter-filled-teams.pipe';
import {PendingDanceOffPipe} from '@src/app/competition/teams-dancefloor/pipes/pending-dance-off.pipe';
import {PendingPostingDanceoffsPipe} from '@src/app/competition/teams-dancefloor/pipes/pending-posting-danceoffs.pipe';
import {ToCompeteAgainPipe} from '@src/app/competition/teams-dancefloor/pipes/to-compete-again.pipe';
import {TeamComponent} from '@src/app/competition/teams-dancefloor/team/team.component';
import {IsRobotActivePipe} from '@src/app/shared/robot/pipes/is-robot-active.pipe';
import {IsRobotInDanceoffPipe} from '@src/app/shared/robot/pipes/is-robot-in-danceoff.pipe';
import {RobotComponent} from '@src/app/shared/robot/robot.component';
import {FindStatusPipe} from '@src/app/competition/teams-dancefloor/pipes/find-status.pipe';
import {DanceOffStatusComponent} from '@src/app/competition/teams-dancefloor/dance-off-status/dance-off-status.component';
import {ActivePairExistsPipePipe} from '@src/app/shared/robot/pipes/active-pair-exists.pipe';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Status} from '@src/app/status';
import {NgZone} from '@angular/core';


class StatusServiceStub extends StatusService {
  status$: Observable<Status>;
  statusHistory$: Observable<Status[]>;

  init(): void {
  }

  setStatus(status: Status): void {
  }
}

describe('CompetitionGuard (integrated)', () => {
  let guard: CompetitionGuard;
  let httpMock: HttpTestingController;
  let canNavigate: boolean;
  let location: Location;
  let ngZone: NgZone;
  let myStatusService: StatusServiceStub;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompetitionComponent,
        TeamsCreatorComponent,
        TeamsComposerComponent,
        TeamComponent,
        RobotComponent,
        DanceOffStatusComponent,
        MessagesComponent,
        FilterFilledTeamsPipe,
        ActivePairExistsPipePipe,
        IsRobotActivePipe,
        FindStatusPipe,
        IsRobotInDanceoffPipe,
        PendingDanceOffPipe,
        PendingPostingDanceoffsPipe,
        ToCompeteAgainPipe,
        TeamsDancefloorComponent],
      imports: [FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        RouterTestingModule.withRoutes([{
          path: 'competition',
          component: CompetitionComponent
        }])],
      providers: [{provide: StatusService, useClass: StatusServiceStub}]
    }).compileComponents();
    guard = TestBed.inject(CompetitionGuard);
    httpMock = TestBed.inject(HttpTestingController);
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    myStatusService = TestBed.inject(StatusService);
    ngZone = TestBed.inject(NgZone);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  describe('and navigates to /competition', () => {
    beforeEach(async () => {
      await ngZone.run(async () => (canNavigate = await router.navigateByUrl('/competition')));
    });

    it('grants access', () => {
      expect(canNavigate).toBeTruthy();
    });

  });

});
