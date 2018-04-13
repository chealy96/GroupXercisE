import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { ExerciseService, FirebaseService, BackendService, WorkoutService } from '../services';
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { Router } from '@angular/router';
import { Exercise } from "../models/exercises.model";
import { exercise } from "../models/pred-exercises.model";
import {Workout} from "../models/workout.model";
import { confirm } from "ui/dialogs";
import * as dialogs from "ui/dialogs";

import { Observable } from 'tns-core-modules/data/observable';
import { Page } from 'ui/page';
import { AnimationCurve } from "ui/enums";
import { FilterableListpicker } from 'nativescript-filterable-listpicker';
import * as frame from "tns-core-modules/ui/frame";

import { ObservableArray } from "data/observable-array";

let MyModel;
@Component({
    selector: "Workout",
    moduleId: module.id,
    templateUrl: "./workout.component.html"
})
export class WorkoutComponent  extends Observable implements OnInit {
    done: boolean = false;
    id: string;
    title: string;
    amount: string;
    description: string;
    imagepath: string;
    UID: string;
    reps: string;
    sets: string;
    restTime: string;
    temparr = [];
    instructions: any;
    muscle: string;
    type: string;
    images: any;
    level: string;
    muscleImagesrc: string;
    workoutName: string;
    exes: any;

    private arrayItems: Array<exercise> = [];
    public filteredexercises: ObservableArray<exercise> = new ObservableArray<exercise>();
    public hint = "please select ";
    public selection: string;
    private filterableListpicker: FilterableListpicker;
    public exercise: Exercise;
    public workout: Workout;

    public exercises$: any;
    constructor(private routerExtensions: RouterExtensions,
        private exerciseService: ExerciseService,
        private firebaseService: FirebaseService,
        private workoutService: WorkoutService,
        private router: Router    
        ) {
            super();
            MyModel = this;
            this.loadData();
        }
 
    public listitems = this.arrayItems;
    @ViewChild('myfilter') myfilter: ElementRef;

    cancelFilterableList() {
        console.log('canceled');
    }

    itemTapped(args) {
      console.dir(args.selectedItem);
          MyModel.set('selection', args.selectedItem);
          if (typeof args.selectedItem == 'string') {
              console.log(args.selectedItem);
              MyModel.set('selection', args.selectedItem);
          } else {
            console.log("yes");

              MyModel.set('selection', args.selectedItem.title);
              this.title = args.selectedItem.title;
              this.instructions = args.selectedItem.instructions;
              this.muscle = args.selectedItem.muscle;
              this.type = args.selectedItem.type;
              this.images = args.selectedItem.images;
              this.level = args.selectedItem.level;
              this.muscleImagesrc = args.selectedItem.muscleImagesrc;
          }

    }
    loadData(){
        this.exerciseService.getPredExerciseList().subscribe((res: any) => {
            this.arrayItems = res;
        });
    }
    showPicker() {
        this.set('listitems',  this.arrayItems);
        this.myfilter.nativeElement.show();
    }
   
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    ngOnInit(): void {
        this.exercises$ =  <any>this.exerciseService.getExerciseList();
        this.exerciseService.getExerciseList().subscribe((data: any) => { 
           // this.exercises$ = data
            this.exes = data;
           // this.getCharges(this.username);
            });
        
        this._sideDrawerTransition = new SlideInOnTopTransition();
    }

    add() {
        this.exercise = new Exercise(
        this.id,
        this.title,
        this.description,
        this.reps,
        this.sets,
        this.restTime,
        this.done,
        this.UID,
        
        this.instructions,
        this.muscle,
        this.type,
        this.images,
        this.level,
        this.muscleImagesrc
        );

        let myExercise:Exercise = this.exercise;
        this.exerciseService.add(myExercise).then((message:any) => {
        this.title = ""
        this.description = "",
        this.reps = "",
        this.sets = "",
        this.restTime = "",
        this.instructions = "",
        this.muscle = "",
        this.type = "",
        this.images = "",
        this.level = "",
        this.muscleImagesrc= ""
        
        dialogs.alert({
            title: "Exercise",
            message: "Exercise has been added to Workout list",
            okButtonText: "OK"
        }).then(() => {
            console.log("Dialog closed!");
        });
         
       })   

     }
   
     
     delete(exercise: Exercise) {
        let options = {
            title: "Delete Exercise",
            message: "Are you sure you want to delete this exercise?",
            okButtonText: "Confirm",
            cancelButtonText: "Cancel"
        };

        confirm(options).then((result: boolean) => {
            console.log(result);
            if(result === true){
                this.exerciseService.delete(exercise)
                .catch(() => {
                    alert("An error occurred while deleting an exercise from your list.");
                });
            }
        });
      
     }

     delete2(exercise: Exercise) {   
                this.exerciseService.delete(exercise)
                .catch(() => {
                  alert("An error occurred while deleting an exercise from your list.");
                });   
     }

     createWorkoutRoutine() {
        this.UID = BackendService.token;

        this.workout = new Workout(
        this.id,
        this.workoutName,
        this.UID,
        this.exes
        );

        let myWorkout: Workout = this.workout;
        this.workoutService.createWorkout(myWorkout).then((message:any) => {
    
        this.exes.forEach(item => {
            this.delete2(item);
        });
        this.id = "",
        this.workoutName = "",
        this.exes = "",

        
        dialogs.alert({
            title: "Workout",
            message: "Your Workout Rouitne has been Created",
            okButtonText: "OK"
        }).then(() => {
            console.log("Dialog closed!");
        });
         
       })   
       
     }
      viewDetail(id: any){
       this.router.navigate(["/list-detail", id]);
    }
    
    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }

    logout() {
        this.firebaseService.logout();
        this.routerExtensions.navigate(["/login"], { clearHistory: true } );
      }
}
