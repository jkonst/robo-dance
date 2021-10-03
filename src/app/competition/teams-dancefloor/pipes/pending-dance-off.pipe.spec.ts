import {PendingDanceOffPipe} from './pending-dance-off.pipe';
import {Status} from '@src/app/status';

describe('PendingDanceOffPipe', () => {
  const pipe = new PendingDanceOffPipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return true for a \'Pending\' status', () => {
    let status = Status.PENDING_POSTING_DANCEOFFS;
    expect(pipe.transform(status)).toBeTruthy();
    status = Status.DANCE_OFFS_PENDING;
    expect(pipe.transform(status)).toBeTruthy();
  });

  it('should return false for a \'Not Pending\' status', () => {
    let status = Status.COMPETITION_COMPLETED;
    expect(pipe.transform(status)).toBeFalsy();
    status = Status.ERROR_POSTING_DANCEOFFS;
    expect(pipe.transform(status)).toBeFalsy();
  });
});
