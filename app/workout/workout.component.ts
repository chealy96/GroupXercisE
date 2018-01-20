import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { FirebaseService } from '../services';
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { Router } from '@angular/router';
import { Exercise } from "../models/exercises.model";
import { Observable } from 'rxjs/Observable';

@Component({
    selector: "Workout",
    moduleId: module.id,
    templateUrl: "./workout.component.html"
})
export class WorkoutComponent implements OnInit {
    id: string;
    name: string;
    amount: string;
    description: string;
    imagepath: string;
    UID: string;
    reps: string;
    sets: string;
    time: string;
    public exercise: Exercise;

    public exercises$: Observable<any>;
    public message$: Observable<any>;
    constructor(private routerExtensions: RouterExtensions,
                private firebaseService: FirebaseService,
                private router: Router
        ) {}S

    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    ngOnInit(): void {
        this.exercises$ = <any>this.firebaseService.getExerciseList();
        this._sideDrawerTransition = new SlideInOnTopTransition();
    }

    add() {
        this.exercise = new Exercise(
         this.id,
         this.name,
         this.description,
         this.reps,
         this.sets,
         this.time,
         this.imagepath,
        this.UID);

        let myExercise:Exercise = this.exercise;
        this.firebaseService.add(myExercise).then((message:any) => {
        this.name = ""
        this.description = "",
         this.reps = "",
         this.sets = "",
         this.time = "",
         
         alert(message);
       })   
       
     }
   
     delete(exercise: Exercise) {
       this.firebaseService.delete(exercise)
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
