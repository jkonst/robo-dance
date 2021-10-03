import {TestBed} from '@angular/core/testing';

import {RobotsDataService} from './robots-data.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {dummyRobots} from '@src/app/competition/services/robots-data';

describe('RobotsDataService', () => {
  let service: RobotsDataService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RobotsDataService]
    });
    service = TestBed.inject(RobotsDataService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load all 14 dummy robots which are not out of order', (done) => {
    service.loadRobots();
    const request = httpMock.expectOne( '/parkside/api/robots');
    expect(request.request.method).toBe('GET');
    request.flush(dummyRobots);
    service.robots$.subscribe(robots => {
      expect(robots.length).toBe(14);
      done();
    });
  });

  it('should load 0 robots if internal server error occurs', (done) => {
    service.loadRobots();
    const request = httpMock.expectOne( '/parkside/api/robots');
    expect(request.request.method).toBe('GET');
    request.flush('error', { status: 500, statusText: 'Broken Service' });
    service.robots$.subscribe(robots => {
      expect(robots.length).toBe(0);
      done();
    });
  });

});
