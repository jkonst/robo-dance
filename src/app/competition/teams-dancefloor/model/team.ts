import {Robot} from '@src/app/shared/robot/model/robot';

export interface Team {
  name: string;
  robots: Robot[];
}

export const emptyTeam: Team = {
  name: '',
  robots: []
};
