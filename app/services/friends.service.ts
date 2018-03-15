import {Injectable, NgZone} from "@angular/core";
import { BackendService } from "./backend.service";
import firebase = require("nativescript-plugin-firebase");
import firebaseWebApi = require("nativescript-plugin-firebase/app");
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
//import {UtilsService} from './utils.service';
import 'rxjs/add/operator/share';
import {Exercise} from "../models/exercises.model";
import {Relationship} from "../models/friend.model";
import {FirebaseService, RequestsProvider} from '../services';

@Injectable()
export class FriendsService {
  constructor(
    private ngZone: NgZone,
    private userservice: FirebaseService
  ){}

firefriends = firebaseWebApi.database().ref('/friends');
 private _allItems: Array<Exercise> = [];
 myfriends;
 currentFriends = [];


getFriendExerciseList(uid: string): Observable<any> {
    return new Observable((observer: any) => {
      let path = 'exercises';
      
        let onValueEvent = (snapshot: any) => {
          this.ngZone.run(() => {
            let results = this.handleSnapshot(snapshot.value, uid);
            console.log(JSON.stringify(results))
           // results.filter(s => s.UID === uid)[0];
            observer.next(results);
          });
        };
        firebase.addValueEventListener(onValueEvent, `/${path}`);
    }).share();              
  }
 
//  getMyExeercise(id: string): Observable<any> {
//     return new Observable((observer: any) => {
//       observer.next(this._allItems.filter(s => s.id === id));
//     }).share();
//   }

  handleSnapshot(data: any, uid: string) {
    this._allItems = [];
    if (data) {
      for (let id in data) {        
        let result = (<any>Object).assign({id: id}, data[id]);
        if(uid === result.UID){
          this._allItems.push(result);
        }        
      }
    }
    return this._allItems;
  }

  getmyfriends(): Observable<any> {
    return new Observable((observer: any) => {
    let friendsuid = [];
      const onValueEvent = (snapshot: any) => {
        let allfriends = snapshot.value;
        this.myfriends = []; 
          let myId = BackendService.token;
          for (var i in allfriends){
            if(myId === allfriends[i].uid1){
            friendsuid.push(allfriends[i].uid2);
            }
            if(myId === allfriends[i].uid2){
              friendsuid.push(allfriends[i].uid1);
            }
          } 
       
      };
  
    firebase.addValueEventListener(onValueEvent, `/friends`);
      this.userservice.getallusers().then((users) => {
        this.myfriends = [];
        for (var j in friendsuid)
          for (var key in users) {
            if (friendsuid[j] === users[key].UID) {
              this.myfriends.push(users[key]);
            }
          }
          observer.next(this.myfriends);
      }).catch((err) => {
        alert("err");
      })    
  //  })

  observer.next(this.myfriends);
  }).share();   
}

getUser(id: string): Observable<any> {
  return new Observable((observer: any) => {
    observer.next(this.myfriends.filter(s => s.UID === id)[0]);
  }).share();
}
  
  friendsCheck(id ) {
    let friend: boolean = false;
    this.getmyfriends().subscribe((friends:  any) => {
       this.currentFriends = friends;
       for (var j in this.currentFriends){
        if (this.currentFriends[j].UID === id.UID) {
          friend = true;
        }
      }
      return Promise.reject(friend);
    })
   
  }

}