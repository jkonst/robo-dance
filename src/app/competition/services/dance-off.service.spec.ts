import {TestBed} from '@angular/core/testing';

import {DanceOffService} from './dance-off.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Status} from '@src/app/status';
import {Robot} from '@src/app/shared/robot/model/robot';
import {TeamsService} from '@src/app/competition/services/teams.service';
import {MessagesService} from '@src/app/shared/messages/messages.service';
import {LeaderBoardService} from '@src/app/competition/services/leader-board.service';
import {StatusService} from '@src/app/services/status.service';

class StatusServiceStub {
  setStatus(status: Status): void {
  }
}

class TeamsServiceStub {
  initiateOpponents(): void {
  }

  removeOpponents(opponents: number[]): void {
  }
}

describe('DanceOffService', () => {
  let service: DanceOffService;
  let httpMock: HttpTestingController;
  let myStatusService: StatusServiceStub;
  let myTeamsService: TeamsServiceStub;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DanceOffService,
        {provide: TeamsService, useClass: TeamsServiceStub},
        {provide: StatusService, useClass: StatusServiceStub},
      ]
    });
    service = TestBed.inject(DanceOffService);
    httpMock = TestBed.inject(HttpTestingController);
    myTeamsService = TestBed.inject(TeamsService);
    myStatusService = TestBed.inject(StatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have empty activePair array after init danceoff without competeAgain',
    (done) => {
      service.init();
      service.activePair$.subscribe(pair => {
        expect(pair).toEqual([]);
        done();
      });
    });

  it('should have empty danceoffs array after init danceoff without competeAgain',
    (done) => {
      service.init();
      service.danceOffs$.subscribe(danceoffs => {
        expect(danceoffs).toEqual([]);
        done();
      });
    });

  it('should call initiateOpponents and setStatus after init danceoff' +
    ' with competeAgain', () => {
    jest.spyOn(myStatusService, 'setStatus');
    jest.spyOn(myTeamsService, 'initiateOpponents');
    service.init(true);
    expect(myStatusService.setStatus).toHaveBeenCalledWith(Status.DANCE_OFFS_PENDING);
    expect(myTeamsService.initiateOpponents).toHaveBeenCalled();
  });

  it('should set active pair with robot ids: 1 and 2',
    (done) => {
      service.setActivePair([1, 2]);
      service.activePair$.subscribe(pair => {
        expect(pair).toEqual([1, 2]);
        done();
      });
    });

  it('should remove as opponents the activePair upon calling danceOff ' +
    'and set a danceoff with this pair',
    (done) => {
      jest.spyOn(myTeamsService, 'removeOpponents');
      service.setActivePair([1, 2]);
      service.danceOff();
      expect(myTeamsService.removeOpponents).toHaveBeenCalledWith([1, 2]);
      service.danceOffs$.subscribe(danceoffs => {
        expect(danceoffs.length).toBe(1);
        expect(danceoffs[0].opponents).toEqual([1, 2]);
        done();
      });
    });

  it('should make a POST request to \'/parkside/api/danceoffs\' when 5 ' +
    'danceoffs are completed',
    () => {
      jest.spyOn(myStatusService, 'setStatus');
      for (let i = 1; i <= 10; i += 2) {
        service.setActivePair([i, i + 1]);
        service.danceOff();
      }
      expect(myStatusService.setStatus).toHaveBeenCalledWith(Status.PENDING_POSTING_DANCEOFFS);
      const request = httpMock.expectOne( '/parkside/api/danceoffs');
      expect(request.request.method).toBe('POST');
    });
});
