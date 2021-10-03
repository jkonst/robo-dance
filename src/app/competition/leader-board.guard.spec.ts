import { TestBed } from '@angular/core/testing';

import { LeaderBoardGuard } from './leader-board.guard';

describe('LeaderBoardGuard', () => {
  let guard: LeaderBoardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LeaderBoardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
