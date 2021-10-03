import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TeamsDancefloorComponent} from './teams-dancefloor.component';
import {FilterFilledTeamsPipe} from '@src/app/competition/teams-dancefloor/pipes/filter-filled-teams.pipe';
import {PendingDanceOffPipe} from '@src/app/competition/teams-dancefloor/pipes/pending-dance-off.pipe';
import {PendingPostingDanceoffsPipe} from '@src/app/competition/teams-dancefloor/pipes/pending-posting-danceoffs.pipe';
import {ToCompeteAgainPipe} from '@src/app/competition/teams-dancefloor/pipes/to-compete-again.pipe';
import {TeamComponent} from '@src/app/competition/teams-dancefloor/team/team.component';
import {MatCardModule} from '@angular/material/card';
import {IsRobotActivePipe} from '@src/app/shared/robot/pipes/is-robot-active.pipe';
import {IsRobotInDanceoffPipe} from '@src/app/shared/robot/pipes/is-robot-in-danceoff.pipe';
import {RobotComponent} from '@src/app/shared/robot/robot.component';
import {ActivePairExistsPipePipe} from '@src/app/shared/robot/pipes/active-pair-exists.pipe';
import {FindStatusPipe} from '@src/app/competition/teams-dancefloor/pipes/find-status.pipe';
import {DanceOffStatusComponent} from '@src/app/competition/teams-dancefloor/dance-off-status/dance-off-status.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatDialogModule} from '@angular/material/dialog';
import {LeaderBoardComponent} from '@src/app/competition/leader-board/leader-board.component';
import {DanceOffService} from '@src/app/competition/services/dance-off.service';
import {StatusService} from '@src/app/services/status.service';
import {TeamsService} from '@src/app/competition/services/teams.service';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Team} from '@src/app/competition/teams-dancefloor/model/team';
import {dummyRobots} from '@src/app/competition/services/robots-data';
import {By} from '@angular/platform-browser';
import {Status} from '@src/app/status';

class DanceOffServiceStub {
  danceOff(): void {
  }
}

class TeamsServiceStub {
  teams$: Observable<Team[]> = new BehaviorSubject<Team[]>([]).asObservable();
}

class StatusServiceStub {
  status$: Observable<Status> = new BehaviorSubject<Status>(Status.NOT_STARTED).asObservable();
}

const dummyTeams: Team[] = [{
  name: 'TestA',
  robots: dummyRobots.slice(0, 5)
},
  {
    name: 'TestB',
    robots: dummyRobots.slice(5, 10)
  }
];

describe('TeamsDancefloorComponent', () => {
  let component: TeamsDancefloorComponent;
  let fixture: ComponentFixture<TeamsDancefloorComponent>;
  let myTeamService: TeamsService;
  let myStatusService: StatusService;
  let myDanceOffService: DanceOffService;

  beforeEach(async () => {
    await TestBed.overrideComponent(
      LeaderBoardComponent,
      {
        set: {
          providers: [
            {provide: DanceOffService, useClass: DanceOffServiceStub},
            {provide: StatusService, useClass: StatusServiceStub},
            {provide: TeamsService, useClass: TeamsServiceStub}
          ]
        }
      }
    );
    await TestBed.configureTestingModule({
      declarations: [TeamsDancefloorComponent,
        FilterFilledTeamsPipe,
        PendingDanceOffPipe,
        PendingPostingDanceoffsPipe,
        ToCompeteAgainPipe,
        IsRobotActivePipe,
        IsRobotInDanceoffPipe,
        ActivePairExistsPipePipe,
        FindStatusPipe,
        DanceOffStatusComponent,
        RobotComponent,
        TeamComponent
      ],
      imports: [MatCardModule, HttpClientTestingModule, MatDialogModule]
    })
      .compileComponents();
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TeamsDancefloorComponent);
    component = fixture.componentInstance;
    myTeamService = fixture.debugElement.injector.get(TeamsService);
    myStatusService = fixture.debugElement.injector.get(StatusService);
    myDanceOffService = fixture.debugElement.injector.get(DanceOffService);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display dancefloor-area', async(() => {
    myTeamService.teams$ = of(dummyTeams);
    fixture.detectChanges();
    const danceFloor = fixture.debugElement.query(By.css('.dancefloor-area'));
    expect(danceFloor).toBeTruthy();
  }));

  it('should display button for danceoff', async(() => {
    myTeamService.teams$ = of(dummyTeams);
    myStatusService.status$ = of(Status.DANCE_OFFS_PENDING);
    fixture.detectChanges();
    const danceOffBtn = fixture.debugElement
      .query(By.css('.start-dance-btn-wrapper button.dance-off'));
    expect(danceOffBtn).toBeTruthy();
  }));

  it('should display button for another round', async(() => {
    myTeamService.teams$ = of(dummyTeams);
    myStatusService.status$ = of(Status.COMPETITION_COMPLETED);
    fixture.detectChanges();
    const danceOffBtn = fixture.debugElement
      .query(By.css('.start-dance-btn-wrapper button.another-round'));
    expect(danceOffBtn).toBeTruthy();
  }));

});
