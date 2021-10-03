import {ToCompeteAgainPipe} from './to-compete-again.pipe';
import {Status} from '@src/app/status';

describe('ToCompeteAgainPipe', () => {
  const pipe = new ToCompeteAgainPipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return true when Status is COMPETITION_COMPLETED or ' +
    'ERROR_POSTING_DANCEOFFS', () => {
    let status = Status.COMPETITION_COMPLETED;
    expect(pipe.transform(status)).toBeTruthy();
    status = Status.ERROR_POSTING_DANCEOFFS;
    expect(pipe.transform(status)).toBeTruthy();
  });

  it('should return false when Status is NOT COMPETITION_COMPLETED' +
    ' or ERROR_POSTING_DANCEOFFS', () => {
    let status = Status.ERROR_GETTING_DANCEOFFS;
    expect(pipe.transform(status)).toBeFalsy();
    status = Status.DANCE_OFFS_PENDING;
    expect(pipe.transform(status)).toBeFalsy();
  });

});
