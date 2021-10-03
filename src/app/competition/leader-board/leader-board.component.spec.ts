import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {LeaderBoardComponent} from './leader-board.component';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {RouterTestingModule} from '@angular/router/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LeaderBoardService} from '@src/app/competition/services/leader-board.service';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {Robot} from '@src/app/shared/robot/model/robot';
import {dummyRobots} from '@src/app/competition/services/robots-data';
import {By} from '@angular/platform-browser';

class LeaderBoardServiceStub {
  robots$: Observable<Robot[]> = new BehaviorSubject<Robot[]>([])
    .asObservable();
}

describe('LeaderBoardComponent', () => {
  let component: LeaderBoardComponent;
  let fixture: ComponentFixture<LeaderBoardComponent>;
  let myLeaderboardService: LeaderBoardService;
  beforeEach(async () => {
    await TestBed.overrideComponent(
      LeaderBoardComponent,
      {set: {providers: [{provide: LeaderBoardService, useClass: LeaderBoardServiceStub}]}}
    );
    await TestBed.configureTestingModule({
      declarations: [LeaderBoardComponent],
      imports: [
        RouterTestingModule,
        MatTableModule,
        MatSortModule,
        BrowserAnimationsModule,
        MatPaginatorModule
      ]
    })
      .compileComponents();
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LeaderBoardComponent);
    component = fixture.componentInstance;
    myLeaderboardService = fixture.debugElement.injector.get(LeaderBoardService);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get 0 rows for table when leaderboard service has no robots', () => {
    fixture.detectChanges();

    expect(component.dataSource.data).toEqual([]);
    const tableRows = fixture.nativeElement.querySelectorAll('mat-row');
    expect(tableRows.length).toBe(0);
  });

  it('should get 10 robots for table when leaderboard service has 10 robots', fakeAsync(() => {
    myLeaderboardService.robots$ = of(dummyRobots.slice(0, 10));
    fixture.detectChanges();
    tick(500);
    expect(component.dataSource.data.length).toBe(10);
  }));

});
