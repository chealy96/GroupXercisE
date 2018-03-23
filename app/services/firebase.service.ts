import {Injectable, NgZone} from "@angular/core";
import {User} from "../models";
import { BackendService } from '../services';
import firebase = require("nativescript-plugin-firebase");
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/share';
import {Exercise} from "../models/exercises.model";

@Injectable()
export class FirebaseService {
  constructor(
    private ngZone: NgZone,
  ){}
    
Users: any;
  register(user: User) {
    return firebase.createUser({
      email: user.email,
      password: user.password
    }).then(
          function (result:any) {
            return JSON.stringify(result);
          },
          function (errorMessage:any) {
            alert(errorMessage);
          }
      )
  }
  
  login_google(user: User){
    return firebase.login({
      type: firebase.LoginType.GOOGLE,
      // Optional 
    //  googleOptions: {
    //    hostedDomain: "mygsuitedomain.com"
    //  }
    }).then(
        function (result:any) {
           console.log(result);
           return   JSON.stringify(result);;
        },
        function (errorMessage) {
          console.log(errorMessage);
        }
    );
  }

  login_facebook(user: User){
    return firebase.login({
      type: firebase.LoginType.FACEBOOK,
      // Optional
      facebookOptions: {
        // defaults to ['public_profile', 'email']
        scope: ['public_profile', 'email']
      }
    }).then(
        function (result:any) {
         return JSON.stringify(result);
        },
        function (errorMessage) {
          console.log(errorMessage);
        }
    );
  }

  getToken(){
   return  firebase.getAuthToken({
      // default false, not recommended to set to true by Firebase but exposed for {N} devs nonetheless :)
      forceRefresh: true
    }).then(
        function (token) {
          console.log("Auth token retrieved: " + token);
        },
        function (errorMessage) {
          console.log("Auth token retrieval error: " + errorMessage);
        }
    );
  }

  updateProfile(user,bio: string,weight: string,height:string,age: string, goals: string){
    firebase.update(
      '/users/'+user.id,
      {'bio':bio,
       "height": height,
       "age": age,
       "weight": weight,
       "goals" : goals
      }
  ).then(
    function (result:any) {
      console.log("update user profile: ");
      return result
    });
    
  }
  addNewUserData(user) {
    // Sets new user data to firestore on login
   // console.log("update user profile:"  +user.uid);
    return firebase.push(`/users`,
     {
      UID: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      provideId: user.providerid
    }).then(
      function (result:any) {
        console.log("update user profile: "+ user.displayName);
      },
      function (errorMessage) {
        console.log(errorMessage);
      }
  );
  }

  login(user: User) {
    return firebase.login({
      type: firebase.LoginType.PASSWORD,
      email: user.email,
      password: user.password
    }).then((result: any) => {
          BackendService.token = result.uid;
          return JSON.stringify(result);
      }, (errorMessage: any) => {
        alert(errorMessage);
      });
  }

  logout(){
    BackendService.token = "";
    firebase.logout();    
  }

  getUserId(){
    return firebase.getCurrentUser().then( (snapshot) => {
      snapshot.uid;
    });
  }
  
  resetPassword(email) {
    return firebase.resetPassword({
    email: email
    }).then((result: any) => {
          alert(JSON.stringify(result));
        },
        function (errorMessage:any) {
          alert(errorMessage);
        }
    ).catch(this.handleErrors);
  }



  handleErrors(error) {
    console.log(JSON.stringify(error));
    return Promise.reject(error.message);
  }

  getallusers() {
    let onQueryEvent = function(user) {
      if (!user.error) {
          console.log("Event type: " + user.type);
          console.log("Key: " + user.email);
          console.log("Value: " + user.uid);
      }
    };
    var promise = new Promise((resolve, reject) => {
      firebase.query(onQueryEvent, "/users/",
      {       singleEvent: true,
              orderBy: {
              type: firebase.QueryOrderByType.CHILD,
              value: 'UID' // mandatory when type is 'child'
      },
      }).then(((snapshot) => {
        this.ngZone.run(() => {
        let userdata = this.handleSnapshot2(snapshot.value);
        let temparr = [];
        for (var key in userdata) {
          temparr.push(userdata[key]);
        }
        resolve(temparr);
        });
      }),
      function (errorMessage) {
        console.log(errorMessage);
        reject(errorMessage);
      })
    })
    return promise;
  }

  handleSnapshot2(data: any) {
    //empty array, then refill and filter
    this.Users = [];
    if (data) {
      for (let id in data) {        
        let result = (<any>Object).assign({id: id}, data[id]);
        if(result.UID != null ){
          this.Users.push(result);
        }        
      }
   //   this.publishUpdates();
    }
    return this.Users;
  }

  getUser(UID: string): Observable<any> {
   
    return new Observable((observer: any) => {
      this.getallusers().then((res : any) => {
        
        observer.next(this.Users.filter(s => s.UID === UID)[0]);
      });
    }).share();
  }
  
}