import {Component, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {User} from '../models/user.model';
import {FirebaseService} from '../services';
import {prompt} from "ui/dialogs";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import firebase = require("nativescript-plugin-firebase");
@Component({
  moduleId: module.id,
  selector: 'gf-login',
  templateUrl: 'login.html'
})
export class LoginComponent {
  user: User;
  hold: any[string];
  isLoggingIn = true;
  isAuthenticating = false;
  res = null;
  isBusy = false;

  constructor(private firebaseService: FirebaseService,
              private routerExtensions: RouterExtensions,
              private ngZone: NgZone
            ) {
              this.user = new User();
              //this.user.photoURL ="http://blunt.one/images/unisex.jpg";
            }

 submit() {
    this.isAuthenticating = true;
    if (this.isLoggingIn) {
      this.login();
    } else {
      this.signUp();
    }
  }

  signInWithFacebook() {
    return this.firebaseService.login_facebook(this.user)
    .then((result: any) => {
      this.hold =  JSON.parse(result);
      this.isAuthenticating = false;
      this.user.uid = this.hold.uid;
      this.user.displayName = this.hold.name;
      this.user.email = this.hold.email;
      this.user.providerid = this.hold.providers[1].id;
      this.user.photoURL = this.hold.profileImageURL;
    
      let res = this.check(this.user).then((res: User)=> {
      if( res == null){
        this.firebaseService.addNewUserData(this.user);
     }
    });
     
      this.routerExtensions.navigate(["/"], { clearHistory: true } );

    })
    .catch((message:any) => {
      this.isAuthenticating = false;
    });
  }
  
  login() {
    this.isBusy = true;

     this.firebaseService.login(this.user)
      .then((result: any) => {
        this.hold =  JSON.parse(result);
        this.isAuthenticating = false;
        this.user.uid = this.hold.uid;
        this.user.displayName = this.hold.email;
        this.user.email = this.hold.email;
        this.user.providerid = this.hold.providers[1].id;
        this.user.photoURL = this.hold.profileImageURL;
        this.check(this.user).then((res: User)=> {
          if(res == null){
            this.firebaseService.addNewUserData(this.user);
          }
        });
        this.isBusy = false;
        this.routerExtensions.navigate(["/"], { clearHistory: true } );

      })
      .catch((message:any) => {
        this.isAuthenticating = false;
      });
  }

  signInWithGoogle() {
    this.isBusy = true;

    this.firebaseService.login_google(this.user)
    .then((result: any) => {
      this.hold =  JSON.parse(result);
      this.isAuthenticating = false;
      this.user.uid = this.hold.uid;
      this.user.displayName = this.hold.name;
      this.user.email = this.hold.email;
      this.user.providerid = this.hold.providers[1].id;
      this.user.photoURL = this.hold.profileImageURL;
      
     let res = this.check(this.user).then((res: User)=> {
      if( res == null){
        this.firebaseService.addNewUserData(this.user);
     }
    });
    this.isBusy = false;
    this.routerExtensions.navigate(["/"], { clearHistory: true } );
  
    })
    .catch((message:any) => {
      this.isAuthenticating = false;
    });
  }

  signUp() {
    this.firebaseService.register(this.user)
      .then((result: any) => {
      this.isAuthenticating = false;
        this.toggleDisplay();
      })
      .catch((message:any) => {
        alert(message);
        this.isAuthenticating = false;
      });
  }
  
  check(user){
    let onQueryEvent = function(user) {
     
      if (!user.error) {
          console.log("Event type: " + user.type);
          console.log("Key: " + user.key);
          console.log("Value: " + +JSON.stringify(user.value));
      }
    };
   
    var promise = new Promise((resolve, reject) => {
      firebase.query(onQueryEvent, "/users/",
      {       singleEvent: true,
              orderBy: {
              type: firebase.QueryOrderByType.CHILD,
              value: 'UID' // mandatory when type is 'child'
      },
      }).then((snapshot) => {
            let userdata = snapshot.value;
            let temparr: any = null;

              for (var key in userdata) {
                if(userdata[key].UID == user.uid){
                       temparr = (userdata[key]);
                }   
              }
              resolve(temparr);
              console.log(JSON.stringify(temparr));
          },
          function (errorMessage) {
            console.log(errorMessage);
            reject(errorMessage);
          });
    })
   
    return promise;
  }
    
    
  forgotPassword() {

    prompt({
      title: "Forgot Password",
      message: "Enter the email address you used to register an account for GroupXercise to reset your password.",
      defaultText: "",
      okButtonText: "Ok",
      cancelButtonText: "Cancel"
    }).then((data) => {
      if (data.result) {
        this.firebaseService.resetPassword(data.text.trim())
          .then((result:any) => {
            if(result){
              alert(result);
            }
         });
      }
    });
 }
  
toggleDisplay() {
    this.isLoggingIn = !this.isLoggingIn;
  }

  
}