import {ComponentFixture, TestBed} from '@angular/core/testing';

import {RobotComponent} from './robot.component';
import {MatCardModule} from '@angular/material/card';
import {Robot} from '@src/app/shared/robot/model/robot';
import {By} from '@angular/platform-browser';
import {runOnPushChangeDetection} from '../../shared/utils/helper';
import {ActivePairExistsPipePipe} from '@src/app/shared/robot/pipes/active-pair-exists.pipe';
import {IsRobotInDanceoffPipe} from '@src/app/shared/robot/pipes/is-robot-in-danceoff.pipe';

describe('RobotComponent', () => {
  let component: RobotComponent;
  let fixture: ComponentFixture<RobotComponent>;
  const testRobot: Robot = {
    id: 7,
    avatar: 'https://robohash.org/lisa-root-allen.png',
    name: 'Lisa "Root" Allen',
    powermove: 'Fork Join',
    experience: 15,
    outOfOrder: false
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RobotComponent, ActivePairExistsPipePipe, IsRobotInDanceoffPipe ],
      imports: [MatCardModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RobotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should NOT contain robot-container without @Input robot', () => {
    const robotContainer = fixture.debugElement.query(By.css('.robot-container'));
    expect(robotContainer).not.toBeTruthy();
  });

  it('should show testRobot name', () => {
    component.robot = testRobot;
    runOnPushChangeDetection(fixture).then(() => {
      fixture.detectChanges();
      const titleContainer = fixture.debugElement.query(By.css('.info mat-card-title'));
      expect(titleContainer.nativeElement.textContent).toContain(testRobot.name);
    });

  });

});
