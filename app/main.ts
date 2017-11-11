// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
import { BackendService } from "./services/backend.service";
import { AppModule } from "./app.module";

const firebase = require("nativescript-plugin-firebase");

firebase.init({
  // Optionally pass in properties for database, authentication and cloud messaging,
  // see their respective docs.
  persist: false,
  storageBucket: 'gs://fitness-b88b2.appspot.com/',
  onAuthStateChanged: (data: any) => {
    console.log(JSON.stringify(data))
    if (data.loggedIn) {
      BackendService.token = data.user.uid;
    }
    else {
      BackendService.token = "";
    }
  }
}).then(
  instance => {
    console.log("firebase.init done");
  },
  error => {
    console.log(`firebase.init error: ${error}`);
  }
);

platformNativeScriptDynamic().bootstrapModule(AppModule);
