import {Injectable, NgZone} from "@angular/core";
import { BackendService } from "./backend.service";
import firebase = require("nativescript-plugin-firebase");
import firebaseWebApi = require("nativescript-plugin-firebase/app");
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/share';
import {Exercise} from "../models/exercises.model";
import {Workout} from "../models/workout.model";
import {FirebaseService, ExerciseService} from '../services';

@Injectable()
export class WorkoutService {
  constructor(
    private ngZone: NgZone,
    private userservice: FirebaseService,
    private exerciseservice: ExerciseService
  ){}

fireWorkout = firebaseWebApi.database().ref('/workouts');
 private _allItems: Array<Workout> = [];
 myWorkouts;
 currentWorkouts = [];


 createWorkout(workout: Workout) {   
    return firebase.push(
        "/workouts",
         {
          "name": workout.name, 
          "exercises": workout.exercises, 
          "UID": workout.UID,
  
        }
      ).then(
        function (result:any) {
          return 'Workout added to the Database';
        },
        function (errorMessage:any) {
          console.log(errorMessage);
        }); 
  }
  
  updateWorkoutExercise(workoutID, updatedExerciseList){
    firebase.update(
      '/workouts/'+workoutID+'/',
      {
       "exercises": updatedExerciseList,
      }
  ).then(
    function (result:any) {
      console.log("update user profile: ");
      return result
    });
  }

  resetWorkoutExercisee(workoutID, resetExercises){
    firebase.update(
      '/workouts/'+workoutID+'/',
      {
       "exercises": resetExercises,
      }
  ).then(
    function (result:any) {
      console.log("update user profile: ");
      return result
    });
  }
  delete(workout: Workout) {
    return firebase.remove("/workouts/"+workout.id+"")
      .catch(this.handleErrors);
  }

  handleErrors(error) {
    console.log(JSON.stringify(error));
    return Promise.reject(error.message);
  }
  getMyWorkoutsList(): Observable<any> {
    return new Observable((observer: any) => {
      let path = 'workouts';
        let onValueEvent = (snapshot: any) => {
          this.ngZone.run(() => {
            let results = this.handleSnapshot(snapshot.value);
            console.log(JSON.stringify(results))
             observer.next(results);
          });
        };
        firebase.addValueEventListener(onValueEvent, `/${path}`);
    }).share();         

  }

  getMyWorkout(id: string): Observable<any> {
    return new Observable((observer: any) => {
      observer.next(this._allItems.filter(s => s.id === id)[0]);
    }).share();
  }
  getMyExeercise(id: string): Observable<any> {

    return new Observable((observer: any) => {
      this.getMyWorkoutsList().subscribe((workouts: any) => {
        workouts.forEach(obj => {
          for(let j in obj.exercises) {
            if(obj.exercises[j].id === id){
             observer.next(obj.exercises[j]);
            }
          };
       // observer.next(this._allItems.filter(s => s.exercises.id === id)[0]);
        });

      });
    }).share();
  }
  handleSnapshot(data: any) {
    this._allItems = [];
    if (data) {
      for (let id in data) {        
        let result = (<any>Object).assign({id: id}, data[id]);
        if(BackendService.token === result.UID){
          this._allItems.push(result);
        }        
      }
    }
    return this._allItems;
  }

}