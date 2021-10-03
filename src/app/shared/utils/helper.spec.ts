import {flattenTeamRobots, getRandomInt} from './helper';
import {TeamRobot} from '../robot/model/robot';
import {dummyRobots} from '../../competition/services/robots-data';

describe('utils helper functions test', () => {

  it('should get random integer given a specific range', () => {
    const randomInt = getRandomInt(0, 1);
    expect(randomInt).toBeGreaterThanOrEqual(0);
    expect(randomInt).toBeLessThanOrEqual(1);
  });

  it('should always return 1', () => {
    const randomInt = getRandomInt(0.5, 1.7);
    expect(randomInt).toBe(1);
  });

  it('should flatten 2 Team objects to an array of 5 TeamRobot objects', () => {
    const mockTeams = [{
      name: 'Team-A',
      robots: dummyRobots.slice(0, 2)
    },
      {
        name: 'Team-B',
        robots: dummyRobots.slice(2, 5)
      }
    ];

    const teamRobots: TeamRobot[] = flattenTeamRobots(mockTeams);
    expect(teamRobots.length).toBe(5);
  });

});
