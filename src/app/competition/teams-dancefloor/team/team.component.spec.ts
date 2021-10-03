import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TeamComponent} from './team.component';
import {MatCardModule} from '@angular/material/card';
import {IsRobotActivePipe} from '@src/app/shared/robot/pipes/is-robot-active.pipe';
import {IsRobotInDanceoffPipe} from '@src/app/shared/robot/pipes/is-robot-in-danceoff.pipe';
import {RobotComponent} from '@src/app/shared/robot/robot.component';
import {FindStatusPipe} from '@src/app/competition/teams-dancefloor/pipes/find-status.pipe';
import {DanceOffStatusComponent} from '@src/app/competition/teams-dancefloor/dance-off-status/dance-off-status.component';
import {ActivePairExistsPipePipe} from '@src/app/shared/robot/pipes/active-pair-exists.pipe';
import {Team} from '@src/app/competition/teams-dancefloor/model/team';
import {dummyRobots} from '@src/app/competition/services/robots-data';
import {runOnPushChangeDetection} from '@src/app/shared/utils/helper';
import {By} from '@angular/platform-browser';

const dummyTeam: Team = {
  name: 'TestA',
  robots: dummyRobots.slice(0, 5)
};

describe('TeamComponent', () => {
  let component: TeamComponent;
  let fixture: ComponentFixture<TeamComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamComponent,
        RobotComponent,
        IsRobotActivePipe,
        FindStatusPipe,
        ActivePairExistsPipePipe,
        DanceOffStatusComponent,
        IsRobotInDanceoffPipe],
      imports: [MatCardModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display robot container', () => {
    component.team = dummyTeam;
    runOnPushChangeDetection(fixture).then(() => {
      fixture.detectChanges();
      const robotsContainer = fixture.debugElement.query(By.css('.robots-container'));
      expect(robotsContainer).toBeTruthy();
    });
  });

  it('should display 5 mat-cards', () => {
    component.team = dummyTeam;
    runOnPushChangeDetection(fixture).then(() => {
      fixture.detectChanges();
      const robotCards = fixture.debugElement.queryAll(By.css('.robot-container'));
      expect(robotCards.length).toBe(5);
    });
  });

});
