// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { BackendService } from "./services/backend.service";
import { AppModule } from "./app.module";
import * as dialogs from "ui/dialogs";
//import * as fs from "tns-core-modules/file-system"; 

const firebase = require("nativescript-plugin-firebase");
const  firebaseWebApi = require("nativescript-plugin-firebase/app");

firebase.init({
  // Optionally pass in properties for database, authentication and cloud messaging,
  // see their respective docs.
  apiKey: "AIzaSyBm1ybAnHUvTjL6heTHNJ7DoNsWnX_tI3g",
  persist: true,
  authDomain: "fitness-b88b2.firebaseapp.com/",
  databaseURL: "https://fitness-b88b2.firebaseio.com/ ",
  storageBucket: 'gs://fitness-b88b2.appspot.com/',

  
  onAuthStateChanged: (data: any) => {
    console.log(JSON.stringify(data))
    if (data.loggedIn) {
      BackendService.token = data.user.uid;
    }
    else {
      BackendService.token = "";
    }
  },
  onPushTokenReceivedCallback: function(token) {
    console.log("Firebase push token: " + token);
  },
  onMessageReceivedCallback: (message) => {
    console.log(`Title: ${message.title}`);
    console.log(`Body: ${message.body}`);
    // if your server passed a custom property called 'foo', then do this:
    console.log(`Value of 'foo': ${message.data.foo}`);
    dialogs.alert({
      title: message.title,
      message: message.data.foo,
      okButtonText: "ok"
  });
  }
}).then(
  instance => {
    console.log("firebase.init done");
  },
  error => {
    console.log(`firebase.init error: ${error}`);
  }
);

firebaseWebApi.initializeApp();

platformNativeScriptDynamic().bootstrapModule(AppModule);
