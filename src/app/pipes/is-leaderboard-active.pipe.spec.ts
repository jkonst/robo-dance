import {IsLeaderboardActivePipe} from './is-leaderboard-active.pipe';
import {Status} from '../status';

describe('IsLeaderboardActivePipe', () => {
  const pipe = new IsLeaderboardActivePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return true for history including' +
    ' STATUS.COMPETITION_COMPLETED', () => {
    const statusHistory = [Status.NOT_STARTED, Status.COMPETITION_STARTED,
      Status.COMPETITION_COMPLETED, Status.ERROR_GETTING_DANCEOFFS];
    expect(pipe.transform(statusHistory)).toBeTruthy();
  });

  it('should return false for history including' +
    ' STATUS.COMPETITION_COMPLETED', () => {
    const statusHistory = [Status.NOT_STARTED, Status.COMPETITION_STARTED,
      Status.PENDING_POSTING_DANCEOFFS, Status.ERROR_GETTING_DANCEOFFS];
    expect(pipe.transform(statusHistory)).toBeFalsy();
  });

});
