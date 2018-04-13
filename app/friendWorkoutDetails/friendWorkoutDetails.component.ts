import {Component, ViewChild , ElementRef, EventEmitter , OnInit, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router, ActivatedRoute} from '@angular/router';
import { ExerciseService, WorkoutService, FriendsService } from "../services";
import {Exercise, Workout, exercise} from "../models";
import * as enums from 'ui/enums';
import * as imageSource from 'image-source';
import { isAndroid } from "platform";
import { View } from "ui/core/view";
import { topmost } from "ui/frame";

import * as fs from "file-system";

var imageModule = require("ui/image");
var img;

@Component({
  moduleId: module.id,
  selector: "gf-friendWorkoutDetails",
  templateUrl: "friendWorkoutDetails.html"
})
export class friendWorkoutDetailsComponent implements OnInit {
    
  checkTest: boolean = false;
  exercises: any;
  id: string;
  workoutId: string;
  name: string;
  description: string;
  image: any;
  title: string;
  url: string;
  instructions:  Array<string> = [];
  details: string;
  level: string;
  muscle: string;
  muscleImage: string;
  equipment : string;
  type: string;
  reps: string;
  restTime : string;
  sets: string;
  //images: string[];
  images: Array<string> = [];
  private sub: any;
  private imagePath: string;
  private uploadedImageName: string;
  private uploadedImagePath: string;
  public gift: Observable<any>;
  
  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private ngZone: NgZone,
        private exerciseService: ExerciseService,
        private workoutService: WorkoutService,
        private freindService: FriendsService
    ) {}

    @ViewChild("modelCheck") FirstCheckBox: ElementRef;

 ngOnInit() {
  
   this.sub = this.route.params.subscribe((params: any) => {
     this.id = params['id'];
      this.workoutService.getMyWorkout(this.id);
      this.freindService.getFreindsWorkout(this.id).subscribe((workout) => {
        this.ngZone.run(() => {
          for (let prop in workout) {
            //props
            if (prop === "uid") {
              this.id = workout[prop];
            }
            if (prop === "name") {
              this.name = workout[prop];
            }
            if (prop === "exercises") {
              this.exercises = workout[prop];
            }                                         
          }
        });
      });
    });  
  }

  viewDetail(id: any){
  //  this.exerciseService.getExerciseList();
    this.router.navigate(["/list-detail", id]);
  }

  navigateBack(){
    topmost().goBack();
  }

}