import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {TeamsComposerComponent} from './teams-composer.component';
import {MatCardModule} from '@angular/material/card';
import {LeaderBoardComponent} from '@src/app/competition/leader-board/leader-board.component';
import {TeamsService} from '@src/app/competition/services/teams.service';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Team} from '@src/app/competition/teams-dancefloor/model/team';
import {Robot} from '@src/app/shared/robot/model/robot';
import {runOnPushChangeDetection} from '@src/app/shared/utils/helper';
import {By} from '@angular/platform-browser';
import {dummyRobots} from '@src/app/competition/services/robots-data';

class TeamsServiceStub {
  teams$: Observable<Team[]> = new BehaviorSubject<Team[]>([]).asObservable();

  composeTeams(noOfRobots: number, robots: Robot[]): void {

  }
}

describe('TeamsComposerComponent', () => {
  let component: TeamsComposerComponent;
  let fixture: ComponentFixture<TeamsComposerComponent>;
  let myTeamsService: TeamsService;
  beforeEach(async () => {
    await TestBed.overrideComponent(
      LeaderBoardComponent,
      {set: {providers: [{provide: TeamsServiceStub, useClass: TeamsService}]}}
    );
    await TestBed.configureTestingModule({
      declarations: [TeamsComposerComponent],
      imports: [MatCardModule]
    })
      .compileComponents();
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TeamsComposerComponent);
    component = fixture.componentInstance;
    myTeamsService = fixture.debugElement.injector.get(TeamsService);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display teams composer when filled is false ', () => {
    fixture.detectChanges();
    component.isFilled$ = of(false);
    component.noOfRobots = 5;
    runOnPushChangeDetection(fixture).then(() => {
      fixture.detectChanges();
      const fillTeamsContainer = fixture.debugElement.query(By.css('.fill-teams-container'));
      expect(fillTeamsContainer).toBeTruthy();
    });
  });

  it('should NOT display teams composer when filled is true ', () => {
    fixture.detectChanges();
    component.isFilled$ = of(true);
    component.noOfRobots = 5;
    runOnPushChangeDetection(fixture).then(() => {
      fixture.detectChanges();
      const fillTeamsContainer = fixture.debugElement.query(By.css('.fill-teams-container'));
      expect(fillTeamsContainer).toBeFalsy();
    });
  });

  it('should call composeTeams with right aguments after clicking on button ', fakeAsync(() => {
    fixture.detectChanges();
    component.isFilled$ = of(false);
    component.noOfRobots = 5;
    component.robots = dummyRobots;
    runOnPushChangeDetection(fixture).then(() => {
      fixture.detectChanges();
      const btn = fixture.debugElement.query(By.css('.fill-teams-container button'));
      expect(btn).toBeTruthy();
      jest.spyOn(myTeamsService, 'composeTeams');
      btn.nativeElement.click();
      fixture.detectChanges();
      tick(2000);
      fixture.whenStable().then(() => {
        expect(myTeamsService.composeTeams).toHaveBeenCalledWith(5, dummyRobots);
      });
    });
  }));


});
