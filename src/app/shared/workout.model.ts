import { Exercise } from './exercise.model';


export class Workout {
  public date: string;
  public exercises: Exercise[];

  constructor(date: string, exercises: Exercise[]) {
    this.date = date;
    this.exercises = exercises;
  }
}
