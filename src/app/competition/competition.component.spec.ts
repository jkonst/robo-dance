import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CompetitionComponent} from './competition.component';
import {RouterTestingModule} from '@angular/router/testing';
import {TeamsCreatorComponent} from '@src/app/competition/teams-creator/teams-creator.component';
import {MessagesComponent} from '@src/app/shared/messages/messages.component';
import {TeamsDancefloorComponent} from '@src/app/competition/teams-dancefloor/teams-dancefloor.component';
import {TeamsComposerComponent} from '@src/app/competition/teams-creator/teams-composer/teams-composer.component';
import {TeamComponent} from '@src/app/competition/teams-dancefloor/team/team.component';
import {RobotComponent} from '@src/app/shared/robot/robot.component';
import {DanceOffStatusComponent} from '@src/app/competition/teams-dancefloor/dance-off-status/dance-off-status.component';
import {FilterFilledTeamsPipe} from '@src/app/competition/teams-dancefloor/pipes/filter-filled-teams.pipe';
import {ActivePairExistsPipePipe} from '@src/app/shared/robot/pipes/active-pair-exists.pipe';
import {IsRobotActivePipe} from '@src/app/shared/robot/pipes/is-robot-active.pipe';
import {FindStatusPipe} from '@src/app/competition/teams-dancefloor/pipes/find-status.pipe';
import {IsRobotInDanceoffPipe} from '@src/app/shared/robot/pipes/is-robot-in-danceoff.pipe';
import {PendingDanceOffPipe} from '@src/app/competition/teams-dancefloor/pipes/pending-dance-off.pipe';
import {PendingPostingDanceoffsPipe} from '@src/app/competition/teams-dancefloor/pipes/pending-posting-danceoffs.pipe';
import {ToCompeteAgainPipe} from '@src/app/competition/teams-dancefloor/pipes/to-compete-again.pipe';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {By} from '@angular/platform-browser';
import {LeaderBoardService} from '@src/app/competition/services/leader-board.service';
import {BehaviorSubject, Observable, of} from 'rxjs';

class LeaderBoardServiceStub {
  isBoardActive$: Observable<boolean> = new BehaviorSubject<boolean>(false)
    .asObservable();
}

describe('CompetitionComponent', () => {
  let component: CompetitionComponent;
  let fixture: ComponentFixture<CompetitionComponent>;
  let myLeaderboardService: LeaderBoardService;
  beforeEach(async () => {
    await TestBed.overrideComponent(
      CompetitionComponent,
      {set: {providers: [{provide: LeaderBoardService, useClass: LeaderBoardServiceStub}]}}
    );


    await TestBed.configureTestingModule({
      imports: [FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatDialogModule,
        RouterTestingModule],
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
    })
    .compileComponents();
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CompetitionComponent);
    component = fixture.componentInstance;
    myLeaderboardService = fixture.debugElement.injector.get(LeaderBoardService);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display app-teams-creator and app-teams-dancefloor' +
    ' when isBoardActive is false', () => {
    fixture.detectChanges();
    const teamsCreator = fixture.debugElement
      .query(By.css('app-teams-creator'));
    const danceFloor = fixture.debugElement
      .query(By.css('app-teams-dancefloor'));
    expect(teamsCreator).toBeTruthy();
    expect(danceFloor).toBeTruthy();
  });

  it('should NOT display app-teams-creator and app-teams-dancefloor' +
    ' when isBoardActive is true', () => {
    myLeaderboardService.isBoardActive$ = of(true);
    fixture.detectChanges();
    const teamsCreator = fixture.debugElement
      .query(By.css('app-teams-creator'));
    const danceFloor = fixture.debugElement
      .query(By.css('app-teams-dancefloor'));
    expect(teamsCreator).toBeFalsy();
    expect(danceFloor).toBeFalsy();
  });

});
