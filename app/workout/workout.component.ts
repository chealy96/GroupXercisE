import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { ExerciseService, FirebaseService } from '../services';
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { Router } from '@angular/router';
import { Exercise } from "../models/exercises.model";
import { exercise } from "../models/pred-exercises.model";

//import { Observable } from 'rxjs/Observable';

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
    id: string;
    title: string;
    amount: string;
    description: string;
    imagepath: string;
    UID: string;
    reps: string;
    sets: string;
    time: string;
    temparr = [];
    instructions: any;
    muscle: string;
    type: string;
    images: any;
    level: string;
    muscleImagesrc: string;

    private arrayItems: Array<exercise> = [];
    public filteredexercises: ObservableArray<exercise> = new ObservableArray<exercise>();
    public hint = "please select ";
    public selection: string;
    private filterableListpicker: FilterableListpicker;
    public exercise: Exercise;

    public exercises$: any;
    public message$: any;
    constructor(private routerExtensions: RouterExtensions,
        private exerciseService: ExerciseService,
        private firebaseService: FirebaseService,
        private router: Router    
        ) {
            super();
            MyModel = this;
            this.exerciseService.getPredExerciseList().subscribe((res: any) => {
                this.arrayItems = res;
                this.temparr = res;
                this.filteredexercises = new ObservableArray<exercise>();
                this.arrayItems.forEach(item => {
                    this.filteredexercises.push(item);
                });
            })
        }
 
    // private objArray = [
    //     {
    //         "image": "https://lh3.googleusercontent.com/gN6iBKP1b2GTXZZoCxhyXiYIAh8QJ_8xzlhEK6csyDadA4GdkEdIEy9Bc8s5jozt1g=w300",
    //         "title": "Brown Bear",
    //         "description": "Brown bear brown bear, what do you see?"
    //     },
    //     {
    //         "image": "http://icons.veryicon.com/png/Flag/Rounded%20World%20Flags/Indonesia%20Flag.png",
    //         "title": "Red Bird"
    //     },
    //     {
    //         "title": "Purple Cat",
    //         "description": "Why are we teaching kids there are purple cats?"
    //     },
    //     {
    //         "image": "https://lh3.googleusercontent.com/UMB2HRRRAAzXAEaCM9Gg-baCaDx_1RTXHscW5k2Ge3P4KP4mwTt2m6oyEHBWex3c4SxU=w300",
    //         "title": "Blue Horse",
    //         "description": "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it."
    //     },
    //     {
    //         "image": "https://cdn.iconscout.com/public/images/icon/free/png-512/frog-face-animal-aquatic-3272656142b1b3cb-512x512.png",
    //         "title": "Green Frog",
    //         "description": "Cortado, cappuccino, espresso."
    //     },
    //     {
    //         "image": "https://marketplace.canva.com/MAB60kWLDdM/1/thumbnail/canva-cute-dog-icon-MAB60kWLDdM.png",
    //         "title": "White Dog",
    //     },
    //     {
    //         "title": "Yellow Snake",
    //     },
    //     {
    //         "image": "http://icons.iconarchive.com/icons/aha-soft/desktop-halloween/256/Hat-icon.png",
    //         "title": "Black Witch",
    //         "description": "Peter piper picked a peck of pickled peppers."
    //     },
    // ];
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

    showPicker() {
        this.set('listitems',  this.arrayItems);
        this.myfilter.nativeElement.show();
    }
   
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    ngOnInit(): void {
        this.exercises$ = <any>this.exerciseService.getExerciseList();
        this._sideDrawerTransition = new SlideInOnTopTransition();
    }

    add() {
        this.exercise = new Exercise(
        this.id,
        this.title,
        this.description,
        this.reps,
        this.sets,
        this.time,
        this.UID,
        this.instructions,
        this.muscle,
        this.type,
        this.images,
        this.level,
        this.muscleImagesrc);

        let myExercise:Exercise = this.exercise;
        this.exerciseService.add(myExercise).then((message:any) => {
        this.title = ""
        this.description = "",
        this.reps = "",
        this.sets = "",
        this.time = "",
        this.instructions = "",
        this.muscle = "",
        this.type = "",
        this.images = "",
        this.level = "",
        this.muscleImagesrc= ""
        
         alert(message);
       })   
       
     }
   
     delete(exercise: Exercise) {
       this.exerciseService.delete(exercise)
         .catch(() => {
           alert("An error occurred while deleting an item from your list.");
         });
     }
   
      viewDetail(id: string){
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
