import { Exercise } from './exercise.model';

export class Workout {
    public id: number;
    public date: string;
    public exercises: Exercise[];

    constructor(id: number, date: string, exercises: Exercise[]) {
        this.id = id;
        this.date = date;
        this.exercises = exercises;
    }
}