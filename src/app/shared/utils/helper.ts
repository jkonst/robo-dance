import {ComponentFixture} from '@angular/core/testing';
import {ChangeDetectorRef} from '@angular/core';
import {TeamRobot} from '../robot/model/robot';
import {Team} from '../../competition/teams-dancefloor/model/team';

export async function runOnPushChangeDetection(fixture: ComponentFixture<any>): Promise<void> {
  const changeDetectorRef = fixture.debugElement.injector.get<ChangeDetectorRef>(ChangeDetectorRef);
  changeDetectorRef.detectChanges();
  return fixture.whenStable();
}

/**
 * Calculates and returns an integer between two number boundaries
 * @param min lower boundary
 * @param max upper boundary
 */
export const getRandomInt = (min, max): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


/**
 * 1. Maps an array of Team objects to an array of objects consisting of a TeamRobot array
 * 2. Reduces this array of objects to an array of TeamRobot arrays
 * 3. Flattens this array of arrays to a TeamRobot array
 * @param teams an array of Team objects
 */
export const flattenTeamRobots = (teams: Team[]): TeamRobot[] => {
  const allTeamsRobots = teams.map(team =>
    ({
      robots: team.robots.map(robot => ({...robot, teamName: team.name}))
    })
  ).reduce((acc, curr) => [...acc, curr.robots], []);
  return [].concat.apply([], allTeamsRobots);
};
