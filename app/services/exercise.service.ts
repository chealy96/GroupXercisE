import {Injectable, NgZone} from "@angular/core";
import { BackendService } from "./backend.service";
import firebase = require("nativescript-plugin-firebase");
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
//import {UtilsService} from './utils.service';
import 'rxjs/add/operator/share';
import {Exercise} from "../models/exercises.model";
import {exercise} from "../models/pred-exercises.model";
@Injectable()
export class ExerciseService {
  constructor(
    private ngZone: NgZone,
  //  private utils: UtilsService
  ){}
    
  //items: BehaviorSubject<Array<Gift>> = new BehaviorSubject([]);

 private _allItems: Array<Exercise> = [];
 private _allItems2: Array<exercise> = [];


getExerciseList(): Observable<any> {
    return new Observable((observer: any) => {
      let path = 'exercises';
      
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
 
 getMyExeercise(id: string): Observable<any> {
    return new Observable((observer: any) => {
      observer.next(this._allItems.filter(s => s.id === id)[0]);
    }).share();
  }

//   getMyMessage(): Observable<any>{
//     return new Observable((observer:any) => {
//       firebase.getRemoteConfig({
//       developerMode: false, // play with this boolean to get more frequent updates during development
//       cacheExpirationSeconds: 300, // 10 minutes, default is 12 hours.. set to a lower value during dev
//       properties: [{
//       key: "message",
//       default: "Happy Holidays!"
//     }]
//   }).then(
//         function (result) {
//           console.log("Fetched at " + result.lastFetch + (result.throttled ? " (throttled)" : ""));
//           for (let entry in result.properties) 
//             { 
//               observer.next(result.properties[entry]);
//             }
//         }
//     );
//   }).share();
// }

  

  handleSnapshot(data: any) {
    //empty array, then refill and filter
    this._allItems = [];
    if (data) {
      for (let id in data) {        
        let result = (<any>Object).assign({id: id}, data[id]);
        if(BackendService.token === result.UID){
          this._allItems.push(result);
        }        
      }
   //   this.publishUpdates();
    }
    return this._allItems;
  }

  //  publishUpdates() {
  //   // here, we sort must emit a *new* value (immutability!)
  //   this._allItems.sort(function(a, b){
  //       if(a.date < b.date) return -1;
  //       if(a.date > b.date) return 1;
  //     return 0;
  //   })
  //   this.items.next([...this._allItems]);
  //  }

  add(exercise: Exercise) {   
    return firebase.push(
        "/exercises",
        { "name": exercise.name, 
          "reps": exercise.reps, 
          "sets": exercise.sets, 
       
          "time": exercise.time,
          "description": exercise.description, 
          "UID": BackendService.token,
          "date": 0 - Date.now(),
          "imagepath":""
        }
      ).then(
        function (result:any) {
          return 'Exercise added to yourExercise list!';
        },
        function (errorMessage:any) {
          console.log(errorMessage);
        }); 
  }

  editExercise(id:string, description: string, imagepath: string){
  //  this.publishUpdates();
    return firebase.update("/exercises/"+id+"",{
        description: description, 
        imagepath: imagepath})
      .then(
        function (result:any) {
          return 'You have successfully edited this gift!';
        },
        function (errorMessage:any) {
          console.log(errorMessage);
        });  
  }
  editDescription(id:string, description: string){
   // this.publishUpdates();
    return firebase.update("/exercises/"+id+"",{
        description: description})
      .then(
        function (result:any) {
          return 'You have successfully edited the description!';
        },
        function (errorMessage:any) {
          console.log(errorMessage);
        });  
  }
 
  /*
  uploadFile(localPath: string, file?: any): Promise<any> {
      let filename = this.utils.getFilename(localPath);
      let remotePath = `${filename}`;   
      return firebase.uploadFile({
        remoteFullPath: remotePath,
        localFullPath: localPath,
        onProgress: function(status) {
            console.log("Uploaded fraction: " + status.fractionCompleted);
            console.log("Percentage complete: " + status.percentageCompleted);
        }
      });
  }*/
  delete(exercise: Exercise) {
    return firebase.remove("/exercises/"+exercise.id+"")
      .catch(this.handleErrors);
  }
  getDownloadUrl(remoteFilePath: string): Promise<any> {
      return firebase.getDownloadUrl({
        remoteFullPath: remoteFilePath})
      .then(
        function (url:string) {
          return url;
        },
        function (errorMessage:any) {
          console.log(errorMessage);
        });
}

  handleErrors(error) {
    console.log(JSON.stringify(error));
    return Promise.reject(error.message);
  }

  getPredExerciseList(): Observable<any> {
    return new Observable((observer: any) => {
      let path = 'preexercise';
      
        let onValueEvent = (snapshot) => {
          this.ngZone.run(() => {
            let results = this.handleSnapshot2(snapshot.value);
            console.log(JSON.stringify(results))
             observer.next(results);
          });
        };
        firebase.addValueEventListener(onValueEvent, `/${path}`);
    }).share();              
  }

  getExercise(id: string): Observable<any> {
    return new Observable((observer: any) => {
      observer.next(this._allItems2.filter(s => s.title === id)[0]);
    }).share();
  }
  
  handleSnapshot2(data: any) {
    //empty array, then refill and filter
    this._allItems2 = [];
    if (data) {
      for (let title in data) {        
        let result = (<any>Object).assign({id: title}, data[title]);
        if(result.title != null ){
          this._allItems2.push(result);
        }        
      }
   //   this.publishUpdates();
    }
    return this._allItems2;
  }
}