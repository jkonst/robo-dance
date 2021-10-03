export interface Robot {
  id: number;
  name: string;
  powermove: string;
  experience: number;
  outOfOrder: boolean;
  avatar: string;
  winsNo?: number;
}

export interface TeamRobot extends Robot{
  teamName: string;
}

export interface TeamRobotSignature {
  teamName: string;
  robotID: number;
}
