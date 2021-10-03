import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LeaderBoardService} from '@src/app/competition/services/leader-board.service';
import {Subject} from 'rxjs';
import {Robot} from '@src/app/shared/robot/model/robot';
import {MatTableDataSource} from '@angular/material/table';
import {delay, takeUntil} from 'rxjs/operators';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.css']
})
export class LeaderBoardComponent implements OnInit, AfterViewInit, OnDestroy {
  dataSource: MatTableDataSource<Robot> = new MatTableDataSource<Robot>([]);
  displayedColumns: string[] = ['name', 'winsNo'];
  totalResults = 0;
  private readonly destroy$ = new Subject();
  constructor(private router: Router,
              private activeRoute: ActivatedRoute,
              private leaderboardService: LeaderBoardService) {
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    // delay of 500 is to hack the use of paginator and sort due to observable dataSource
    this.leaderboardService.robots$.pipe(takeUntil(this.destroy$), delay(500))
      .subscribe(robots => {
        this.dataSource.data = robots;
        this.totalResults = robots.length;
      });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  backToCompetition(): void {
    this.leaderboardService.setBoardActive(false);
    this.router.navigate(['.'], {relativeTo: this.activeRoute.parent})
      .then(() => {
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
