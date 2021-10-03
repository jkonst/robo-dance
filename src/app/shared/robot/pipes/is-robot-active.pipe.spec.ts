import {IsRobotActivePipe} from './is-robot-active.pipe';

describe('IsRobotActivePipe', () => {
  const pipe = new IsRobotActivePipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return false when a robot\'s id does not exist on a pair of ids', () => {
    expect(pipe.transform(1, [2, 3])).toBeFalsy();
  });

  it('should return true when a robot\'s id exists on a pair of ids', () => {
    expect(pipe.transform(2, [2, 3])).toBeTruthy();
  });

});
