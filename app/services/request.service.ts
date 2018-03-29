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
  firefriends = firebaseWebApi.database().ref('/friends');
  
  private _allItems: Array<connreq> = [];
  userdetails;
  user: any;
  myfriends;
  constructor(public userservice: FirebaseService,private ngZone: NgZone) {
    
  }

  sendrequest(req: connreq) {
    this.firereq =  firebaseWebApi.database().ref(this.path);
    var promise = new Promise((resolve, reject) => {
    firebase.push('/requests',{
     
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

  getmyrequests():  Observable<any> {
    return new Observable((observer: any) => {
    let allmyrequests;
    var myrequests=[];
    this.userdetails = [];
    const onValueEvent = (snapshot: any) => {
      this.ngZone.run(() => {
        let results = this.handleSnapshot(snapshot.value);
        console.log(JSON.stringify(results))
        allmyrequests = results;
        myrequests = [];
        for (var i in allmyrequests) {
          myrequests.push(allmyrequests[i].sender);
        }
      });
    };

  firebase.addValueEventListener(onValueEvent, `/requests`);
    
      this.userservice.getallusers().then((res) => {
        var allusers = res;
        this.ngZone.run(() => {
        for (var j in myrequests)
          for (var key in allusers) {
            if (myrequests[j] === allusers[key].UID) {
              this.userdetails.push(allusers[key]);
            }
          }
        observer.next(this.userdetails);
        });
      });
   // return Promise.resolve(this.userdetails);
    }).share(); 
   
  }  

  handleSnapshot(data: any) {
    //empty array, then refill and filter
    let t = BackendService.token;
    this._allItems = [];
    if (data) {
      for (let id in data) {        
        let result = (<any>Object).assign({id: id}, data[id]);
        if(BackendService.token === result.recipient){
          this._allItems.push(result);
        }        
      }
   
    }
    return this._allItems;
  }

public doWebGetCurrentUser() {
   this.user = firebase.getCurrentUser();
   let id: string;
  if (this.user) {
    id = this.user.__zone_symbol__value.uid
    return id;
  } else {
    alert({
      title: "No current user",
      okButtonText: "OK, thanks"
    });
  }
}

acceptrequest(user) {
  
  var promise = new Promise((resolve, reject) => {

    firebase.push("/friends",{
      "uid1": user.UID,
      "uid2": this.doWebGetCurrentUser()
    }).then(() => {
      
        this.deleterequest(user).then(() => {
        resolve({ success: true });
      })
      
      }).catch((err) => {
        reject(err);
    })
  })
  return promise;
}

deleterequest(user) {
  let allmyrequests;
  let myrequests ;
  var promise = new Promise((resolve, reject) => {
    const onValueEvent = (snapshot: any) => {
      this.ngZone.run(() => {
        let results = this.handleSnapshot(snapshot.value);
        console.log(JSON.stringify(results))
        allmyrequests = results;
    
        for (var i in allmyrequests) {
          if(allmyrequests[i].sender === user.UID){
          myrequests= allmyrequests[i];
          }
        }
        firebase.remove("/requests"+"/"+ myrequests.id+"").then(() => {
          resolve({ success: true });
          console.log("firebase.remove done");
        },
        error => {
          console.log("firebase.remove error: " + error);
        }
        );
      });
    };
 
  firebase.addValueEventListener(onValueEvent, `/requests`);
   })
  return promise; 
}
 
}