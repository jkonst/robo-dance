import {TestBed} from '@angular/core/testing';

import {AppRoutingGuard} from './app-routing.guard';
import {StatusService} from '@src/app/services/status.service';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';

function fakeRouterState(url: string): RouterStateSnapshot {
  return {
    url,
  } as RouterStateSnapshot;
}

class StatusServiceStub {
  init(): void{}
}

describe('AppRoutingGuardGuard', () => {
  let guard: AppRoutingGuard;
  let myStatusService: StatusServiceStub;
  beforeEach(() => {
    TestBed.configureTestingModule({providers:[
        {provide: StatusService, useClass: StatusServiceStub}
      ]});
    guard = TestBed.inject(AppRoutingGuard);
    myStatusService = TestBed.inject(StatusService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should activate home context url', () => {
    jest.spyOn(myStatusService, 'init');
    const canActivate = guard.canActivate({} as ActivatedRouteSnapshot, fakeRouterState('/'));
    expect(canActivate).toBeTruthy();
  });
});
