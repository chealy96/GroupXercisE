import { Injectable, EventEmitter , NgZone } from '@angular/core';
import {connreq} from '../models/request.model';
import {User} from '../models/user.model';
import {FirebaseService} from '../services';
import firebase = require("nativescript-plugin-firebase");
import firebaseWebApi = require("nativescript-plugin-firebase/app");
import { BackendService } from "./backend.service";
import {Observable} from 'rxjs/Observable';
/*
  Generated class for the RequestsProvider provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RequestsProvider {
  path = "/requests";
  firereq =  firebaseWebApi.database().ref(this.path);
  private _allItems: Array<connreq> = [];
  //firereq;
  userdetails;
  user: any;
  constructor(public userservice: FirebaseService,private ngZone: NgZone,) {
    
  }

  sendrequest(req: connreq) {
    this.firereq =  firebaseWebApi.database().ref(this.path);
    var promise = new Promise((resolve, reject) => {
    firebase.push('/requests',{
     //this.firereq.set({
      sender: req.sender,
      recipient: req.recipient
      }).then(() => {
        resolve({ success: true });
        }).catch((err) => {
          resolve(err);
        })
    })
    return promise;  
  }
//.(this.userservice.getUserId())
  getmyrequests(){
    let allmyrequests;
    var myrequests=[];
    const onValueEvent = (snapshot: any) => {
      this.ngZone.run(() => {
        let results = this.handleSnapshot(snapshot.value);
        console.log(JSON.stringify(results))
        allmyrequests = results;
      });
    };
   // this.firereq.on('value', (snapshot: any) => {
  //    allmyrequests = snapshot.val;
 // this.firereq.on('value', onValueEvent );
  firebase.addValueEventListener(onValueEvent, `/requests`);
      myrequests = [];
      for (var i in allmyrequests) {
        myrequests.push(allmyrequests[i].sender);
      }
      this.userservice.getallusers().then((res) => {
        var allusers = res;
        this.userdetails = [];
        for (var j in myrequests)
          for (var key in allusers) {
            if (myrequests[j] === allusers[key].uid) {
              this.userdetails.push(allusers[key]);
            }
          }
      //  this.events.publish('gotrequests');
      })
    //})

   
   // 
    return myrequests;
   
   
  }  

  handleSnapshot(data: any) {
    //empty array, then refill and filter
    this._allItems = [];
    if (data) {
      for (let id in data) {        
        let result = (<any>Object).assign({id: id}, data[id]);
        if(BackendService.token === result.recipient){
          this._allItems.push(result);
        }        
      }
   //   this.publishUpdates();
    }
    return this._allItems;
  }

public doWebGetCurrentUser() {
  //const user = userservice.auth().currentUser;
   this.user = firebase.getCurrentUser();
  if (this.user) {
   // let holder: any = JSON.stringify(this.user);
    //this.user = JSON.parse(holder.__zone_symbol__value.uid);
    // alert({
    //   title: "Current user",
    //   message: JSON.stringify(this.user),
    //   okButtonText: "Nice!"
    // });
    return this.user.__zone_symbol__value.uid;
  } else {
    alert({
      title: "No current user",
      okButtonText: "OK, thanks"
    });
  }
 
  
}

}