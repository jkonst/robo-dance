import {Component, OnInit} from '@angular/core';
import {filter} from 'rxjs/operators';
import {NavigationEnd, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Status} from './status';
import {StatusService} from './services/status.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  statusHistory$: Observable<Status[]>;

  ngOnInit(): void {
    this.statusHistory$ = this.statusService.statusHistory$;
  }

  constructor(
    private statusService: StatusService
  ) {
  }

}
