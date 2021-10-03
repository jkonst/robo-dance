import { TestBed } from '@angular/core/testing';

import { LeaderBoardService } from './leader-board.service';
import {dummyRobots} from '@src/app/competition/services/robots-data';

describe('LeaderBoardService', () => {
  let service: LeaderBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaderBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set isBoardActive to true', (done) => {
    service.setBoardActive(true);
    service.isBoardActive$.subscribe(isActive => {
      expect(isActive).toBe(true);
      done();
    });
  });

  it('should set robots to dummyRobots', (done) => {
    service.setRobots(dummyRobots);
    service.robots$.subscribe(robots => {
      expect(robots).toEqual(dummyRobots);
      done();
    });
  });
});
