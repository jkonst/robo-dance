import {TestBed} from '@angular/core/testing';

import {StatusService} from './status.service';
import {Status} from '../status';

describe('StatusService', () => {
  let service: StatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have history [Status.NOT_STARTED] upon init', (done) => {
    service.init();
    // service.status$.subscribe(status => expect(status).toBe(Status.NOT_STARTED));
    service.statusHistory$.subscribe(history => {
      expect(history).toEqual([Status.NOT_STARTED]);
      done();
    });
  });

  it('should have status Status.NOT_STARTED upon init', (done) => {
    service.init();
    service.status$.subscribe(status => {
      expect(status).toEqual(Status.NOT_STARTED);
      done();
    });
  });

  it('should have the right history after setting status' +
    ' to Status.COMPETITION_STARTED', (done) => {
    service.init();
    service.setStatus(Status.COMPETITION_STARTED);
    service.statusHistory$.subscribe(history => {
      expect(history)
        .toEqual([Status.NOT_STARTED, Status.COMPETITION_STARTED]);
      done();
    });
  });

});
