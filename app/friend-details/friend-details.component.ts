import {Component, OnInit, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router, ActivatedRoute} from '@angular/router';
import { FirebaseService , FriendsService } from '../services';
import {exercise, User, Exercise} from "../models";
import * as enums from 'ui/enums';
import * as imageSource from 'image-source';
import { isAndroid } from "platform";
import { View } from "ui/core/view";
import { TextView } from "ui/text-view";
import { topmost } from "ui/frame";

var imageModule = require("ui/image");
var img;

@Component({
  moduleId: module.id,
  selector: "gf-friend-detail",
  templateUrl: "friend-details.html"
})
export class FriendDetailsComponent implements OnInit {
  id: string;
  title: string;
  email: string;
  displayName: string;
  uid : string;
  photoURL: string;

  weight: string;
  height: string;
  age: string;
  bio: string;
  goals: string;

  public exercises$: Observable<any>;
  public workouts: any;;
  private sub: any;
  private imagePath: string;
  private uploadedImageName: string;
  private uploadedImagePath: string;
  public gift: Observable<any>;
  
  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private ngZone: NgZone,
        private firebaseService: FirebaseService,
        private friendsService: FriendsService
    ) {}

  navigateBack(){
    topmost().goBack();
  }
  
  viewWorkout(id: string){
    this.router.navigate(["/workoutDetail", id]);
  }
 ngOnInit() {
   this.sub = this.route.params.subscribe((params: any) => {
      this.id = params['UID'];
    
       this.friendsService.getUser(this.id).subscribe((User) => {
         this.ngZone.run(() => {
          for (let prop in User) {
            //props
            if (prop === "displayName") {
              this.displayName = User[prop];
             }
            if (prop === "email") {
              this.email = User[prop];
            }
            if (prop === "UID") {
              this.uid = User[prop];
            }   
            if (prop === "photoURL") {
              this.photoURL = User[prop];
            } 
            if (prop === "weight") {
              this.weight = exercise[prop];
            }    
            if (prop === "height") {
              this.height= User[prop];
            }    
            if (prop === "age") {
              this.age = User[prop];
            }    
            if (prop === "bio") {
              this.bio = User[prop];
            }      
            if (prop === "goals") {
              this.goals = User[prop];
            }                                
           }
        });
        this.exercises$ = <any>this.friendsService.getFriendExerciseList(this.uid);
        this.friendsService.getFriendWorkoutList(this.uid).subscribe((data: any) => { 
          this.workouts = data;
         });
        // this.friendsService.getFriendExerciseList(this.uid).subscribe((res :any) => {
        //   this.exercises$ = res;
        //   });
      });
   });  
  }



}