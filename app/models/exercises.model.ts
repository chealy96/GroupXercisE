export class Exercise {
    constructor
      (
        public id: string,
        public title: string,
        public description: string,
        public reps: string,
        public sets: string,
        public time: string,
        public UID: string,
        
        public instructions: any,
        public muscle: string,
        public type: string,
        public images: any,
        public level: string,
        public muscleImagesrc: string
      )
    {}   
}