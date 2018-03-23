import { Exercise } from "../models/exercises.model";

export class Workout {
    constructor
        (
        public id: string,
        public name: String,
        public UID: String,
        public exercises: any
        )
        {}  
  }