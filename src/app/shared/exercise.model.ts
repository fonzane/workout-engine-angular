import { Set } from './set.model';

export class Exercise{
  public name: string;
  public sets: Set[];

  constructor(name: string, sets: Set[]) {
    this.name = name;
    this.sets = sets;
  }
}
