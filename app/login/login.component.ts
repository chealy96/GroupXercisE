import {Component} from '@angular/core';
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

  
  constructor(private firebaseService: FirebaseService,
              private routerExtensions: RouterExtensions
            ) {
              this.user = new User();
           //   this.user.email = "user@nativescript.org";
            //  this.user.password = "password";
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
      if(this.check(this.user) != null){
        this.firebaseService.addNewUserData(this.user);
     }else{
       this.firebaseService.updateUserData(this.user);
      }
      this.routerExtensions.navigate(["/"], { clearHistory: true } );

    })
    .catch((message:any) => {
      this.isAuthenticating = false;
    });
  }
  
  login() {
     this.firebaseService.login(this.user)
      .then((result: any) => {
        this.hold =  JSON.parse(result);
        this.isAuthenticating = false;
        this.user.uid = this.hold.uid;
        this.user.displayName = this.hold.name;
        this.user.email = this.hold.email;
        this.user.providerid = this.hold.providers[1].id;
        this.user.photoURL = this.hold.profileImageURL;
        if(this.check(this.user) != null){
          this.firebaseService.addNewUserData(this.user);
       }else{
         this.firebaseService.updateUserData(this.user);
       }
        this.routerExtensions.navigate(["/"], { clearHistory: true } );

      })
      .catch((message:any) => {
        this.isAuthenticating = false;
      });
  }

  signInWithGoogle() {
    this.firebaseService.login_google(this.user)
    .then((result: any) => {
      this.hold =  JSON.parse(result);
      this.isAuthenticating = false;
      this.user.uid = this.hold.uid;
      this.user.displayName = this.hold.name;
      this.user.email = this.hold.email;
      this.user.providerid = this.hold.providers[1].id;
      this.user.photoURL = this.hold.profileImageURL;
      if(this.check(this.user) != null){
    console.log("HEEEEEEEEEEEEER "+   this.user);


        this.firebaseService.addNewUserData(this.user);
      }else{
       this.firebaseService.updateUserData(this.user);
      }
      this.routerExtensions.navigate(["/"], { clearHistory: true } );
   //this.firebaseService.getToken();
    })
    .catch((message:any) => {
      this.isAuthenticating = false;
    });
  }

  signUp() {
    this.firebaseService.register(this.user)
      .then((result: any) => {
        this.isAuthenticating = false;
        this.firebaseService.addNewUserData(result);
        this.toggleDisplay();
      })
      .catch((message:any) => {
        alert(message);
        this.isAuthenticating = false;
      });
  }
  
  check(user){
    let profile = null;
    let onQueryEvent = function(user) {
      // note that the query returns 1 match at a time
      // in the order specified in the query
      if (!user.error) {
          console.log("Event type: " + user.type);
          console.log("Key: " + user.email);
          console.log("Value: " + user.uid);
      }
    };

    firebase.query(onQueryEvent, "/users/"+user.uid+"",
        {       singleEvent: true,
                orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'since' // mandatory when type is 'child'
        },
        }).then(function(result) {
          
          profile = true;
          console.log(JSON.stringify(result));
        },
        function (errorMessage) {
          console.log(errorMessage);
        }
        );
        return profile;
    }
    
  forgotPassword() {

    prompt({
      title: "Forgot Password",
      message: "Enter the email address you used to register for Giftler to reset your password.",
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