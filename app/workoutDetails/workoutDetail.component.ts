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
  selector: "gf-workoutDetaildetail",
  templateUrl: "workoutDetail.html"
})
export class workoutDetailComponent implements OnInit {
    
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
      //  private utilsService: UtilsService
    ) {}

    @ViewChild("modelCheck") FirstCheckBox: ElementRef;

    public finishedWorkout() {
      for(let j in this.exercises) {
          this.exercises[j].done = false;
      };
      this.workoutService.resetWorkoutExercisee(this.workoutId, this.exercises);
    }
 
    public checkedChange(modelRef ,exer: Exercise) {

        for(let j in this.exercises) {
          if(this.exercises[j].id === exer.id){
            this.exercises[j].done = modelRef.checked;
          }
        };
      console.log("checkedChange:", modelRef.checked);
      console.log('checked prop value = ' + this.FirstCheckBox.nativeElement.checked);
      this.workoutService.updateWorkoutExercise(this.workoutId, this.exercises);
      
    }
  
    public getCheckProp(exer : any) {
        console.log('checked prop value = ' + this.FirstCheckBox.nativeElement.checked);
    }
 ngOnInit() {
  
   this.sub = this.route.params.subscribe((params: any) => {
      this.workoutId = params['id'];
       
      this.workoutService.getMyWorkout(this.workoutId).subscribe((workout) => {
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
    this.router.navigate(["/list-detail", id]);
  }

  navigateBack(){
    topmost().goBack();
  }
  


}