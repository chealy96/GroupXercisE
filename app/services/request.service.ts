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

  getmyrequests(){
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
       
        for (var j in myrequests)
          for (var key in allusers) {
            if (myrequests[j] === allusers[key].UID) {
              this.userdetails.push(allusers[key]);
            }
          }
          return this.userdetails;
   
      })
    //})

    return this.userdetails;
   
   
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
  if (this.user) {
 
    return this.user.__zone_symbol__value.uid;
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
        resolve(true);
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

getmyfriends() {
  let friendsuid = [];
  this.firefriends.on('value', (snapshot) => {
    let allfriends = snapshot.val();
    this.myfriends = [];
    let myId = this.doWebGetCurrentUser();
    for (var i in allfriends){
      if(myId === allfriends[i].uid1){
      friendsuid.push(allfriends[i].uid2);
      }
      if(myId === allfriends[i].uid2){
        friendsuid.push(allfriends[i].uid1);
      }
    }
      
    this.userservice.getallusers().then((users) => {
      this.myfriends = [];
      for (var j in friendsuid)
        for (var key in users) {
          if (friendsuid[j] === users[key].uid) {
            this.myfriends.push(users[key]);
          }
        }
     
    }).catch((err) => {
      alert(err);
    })
  
  })
}  

}