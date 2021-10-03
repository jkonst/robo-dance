export interface Opponent {
  id: number;
  name: string;
}

export interface OpponentsMap {
  [key: string]: Opponent[];
}
