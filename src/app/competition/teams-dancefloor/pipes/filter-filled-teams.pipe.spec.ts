import { FilterFilledTeamsPipe } from './filter-filled-teams.pipe';
import {dummyRobots} from '@src/app/competition/services/robots-data';

describe('FilterFilledTeamsPipe', () => {
  const pipe = new FilterFilledTeamsPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return false for empty teams', () => {
    expect(pipe.transform([])).toBeFalsy();
  });

  it('should return true for 2 teams with robots', () => {
    const dummyTeams = [
      {
        name: 'TeamA',
        robots: dummyRobots.slice(6, 11)
      },
      {
        name: 'TeamB',
        robots: dummyRobots.slice(0, 6)
      }
    ];
    expect(pipe.transform(dummyTeams)).toBeTruthy();
  });

});
