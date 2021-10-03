import { IsRobotInDanceoffPipe } from './is-robot-in-danceoff.pipe';

describe('IsRobotInDanceoffPipe', () => {
  const pipe = new IsRobotInDanceoffPipe();
  const mockDanceoffs = [
    {opponents: [1, 2], winner: 2},
    {opponents: [3, 4], winner: 3},
    {opponents: [6, 5], winner: 6},
    {opponents: [7, 8], winner: 8},
  ];

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return false if a robot id does not exist in dance off pairs', () => {
    expect(pipe.transform(10, mockDanceoffs)).toBeFalsy();
  });

  it('should return true if a robot id exists in dance off pairs', () => {
    expect(pipe.transform(5, mockDanceoffs)).toBeTruthy();
  });

  it('should return false when there are no dance off pairs', () => {
    expect(pipe.transform(5, [])).toBeFalsy();
  });

});
