import {FindStatusPipe} from './find-status.pipe';
import {DanceOffPair} from '@src/app/competition/teams-dancefloor/model/danceoff';

const dummyPair: DanceOffPair[] = [
  {
  opponents: [1, 2],
  winner: 2
  },
  {
    opponents: [3, 4],
    winner: 3
  },
  {
    opponents: [5, 6],
    winner: 6
  },
  {
    opponents: [7, 8],
    winner: 7
  },
  {
    opponents: [9, 10],
    winner: 9
  },
];

describe('FindStatusPipe', () => {
  const pipe = new FindStatusPipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should get null when DanceOffPair is empty or null', () => {
    expect(pipe.transform(1, [])).toBe(null);
    expect(pipe.transform(1, null)).toBe(null);
  });

  it('should get status W for dummy DanceOffPair with id 9', () => {
    expect(pipe.transform(9, dummyPair)).toBe('W');
  });

  it('should get status L for dummy DanceOffPair with id 10', () => {
    expect(pipe.transform(10, dummyPair)).toBe('L');
  });

});
