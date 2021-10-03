import { PendingPostingDanceoffsPipe } from './pending-posting-danceoffs.pipe';
import {Status} from '@src/app/status';

describe('PendingPostingDanceoffsPipe', () => {
  const pipe = new PendingPostingDanceoffsPipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return true when Status is PENDING_POSTING_DANCEOFFS',
    () => {
    expect(pipe.transform(Status.PENDING_POSTING_DANCEOFFS)).toBeTruthy();
  });

  it('should return false when Status is NOT PENDING_POSTING_DANCEOFFS',
    () => {
      expect(pipe.transform(Status.DANCE_OFFS_PENDING)).toBeFalsy();
      expect(pipe.transform(Status.ERROR_POSTING_DANCEOFFS)).toBeFalsy();
    });
});
