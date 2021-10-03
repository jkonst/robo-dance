import {Robot} from '@src/app/shared/robot/model/robot';

export interface DanceOffPair {
  opponents: number[],
  winner: number;
}

export interface DanceOff  {
  id: number;
  winner: Robot;
  loser: Robot;
  danceAt: string;
}
