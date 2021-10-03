import { ActivePairExistsPipePipe } from './active-pair-exists.pipe';

describe('ShowPickOpponentPipe', () => {
  const pipe = new ActivePairExistsPipePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return true when a pair consists of two numbers', () => {
    const pair = [1, 2];
    expect(pipe.transform(pair)).toBeTruthy();
  });

  it('should return false when a pair does not consist of two numbers', () => {
    const pair = [];
    expect(pipe.transform(pair)).not.toBeTruthy();
  });

});
