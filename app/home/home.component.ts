import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import {FirebaseService, WorkoutService} from '../services';
import { RequestsProvider, FriendsService, BackendService } from '../services';
import {connreq} from '../models/request.model';
import {Observable} from "rxjs";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { alert , prompt } from "tns-core-modules/ui/dialogs";
import { TabView, SelectedIndexChangedEventData, TabViewItem } from "ui/tab-view";
import { Router } from '@angular/router';
import { User } from "../models/user.model";
import { StackLayout } from "ui/layouts/stack-layout";
import firebase = require("nativescript-plugin-firebase");
import {Workout} from "../models/workout.model";
import { confirm } from "ui/dialogs";
//import * as platformModule from "tns-core-modules/platform";
//import { isAndroid, isIOS, device, screen } from "platform";
@Component({
    selector: "Home", 
    moduleId: module.id,
    templateUrl: "./home.component.html"
})

export class HomeComponent implements OnInit {
    user: User;
    workouts: any;
   // myfriends

  //  hold;
    Screen_width: number;
    Screen_height: number;
    Screen_scale: number;
    name: string;
    description: string;
    imagepath: string;
    image: any;
    weight: string;
    height: string;
    age: string;
    bio: string;
    goals: string;
    
    profile : any;
    holder: any;
    email: string;
    profilePhoto: string;
    public tabSelectedIndex: number;
    constructor(private routerExtensions: RouterExtensions,
    private firebaseService: FirebaseService,
    private requestservice: RequestsProvider,
    private friendService: FriendsService,
    private workoutService: WorkoutService,
    private router: Router
    ) {
        this.tabSelectedIndex = 0;
        
        this.user = new User();
   
    }
   
    changeTab() {
        if (this.tabSelectedIndex === 0) {
            this.tabSelectedIndex = 1;
        } else if (this.tabSelectedIndex === 1) {
            this.tabSelectedIndex = 2;
        } else if (this.tabSelectedIndex === 2) {
            this.tabSelectedIndex = 0;
        }
    }
   
    updateProfile(){
        this.firebaseService.getUser(BackendService.token).subscribe((user: any) => {
         this.firebaseService.updateProfile(user,this.bio,this.weight,this.height,this.age, this.goals);
        });
    }
    
    viewWorkout(id: string){
        this.router.navigate(["/workoutDetail", id]);
    }
    delete(workout: Workout) {
        let options = {
            title: "Delete Workout",
            message: "Are you sure you want to delete this workout?",
            okButtonText: "Confirm",
            cancelButtonText: "Cancel"
        };

        confirm(options).then((result: boolean) => {
            console.log(result);
            if(result === true){
                this.workoutService.delete(workout)
                .catch(() => {
                    alert("An error occurred while deleting an item from your list.");
                });
            }
        });
    }

    viewProfile(item: User){
        this.router.navigate(["/friend-details",item.id]);
    }


    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    private _sideDrawerTransition: DrawerTransitionBase;

    ngOnInit(): void {
    this._sideDrawerTransition = new SlideInOnTopTransition();
    
     this.profile = JSON.stringify(firebase.getCurrentUser());
     this.holder = JSON.parse(this.profile);
     this.profile = this.holder.__zone_symbol__value;
     this.email = this.profile.email;
     this.profilePhoto = this.profile.profileImageURL;
     this.name = this.profile.name;

     this.firebaseService.getUser(BackendService.token).subscribe((result: any) => {
        this.age = result.age;
        this.weight = result.weight;
        this.height = result.height;
        this.bio = result.bio;
        this.goals = result.goals;
    });
    this.workoutService.getMyWorkoutsList().subscribe((data: any) => { 
         this.workouts = data;
        });
        // app.android.startActivity.getWindow().setSoftInputMode(
        // android.view.WindowManager.LayoutParams.SOFT_INPUT_STATE_HIDDEN);
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
