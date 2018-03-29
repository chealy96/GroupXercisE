import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule } from "@angular/core";

import { friendWorkoutDetailsRouting } from "./friendWorkoutDetails.routes";
import { friendWorkoutDetailsComponent } from "./friendWorkoutDetails.component";

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    friendWorkoutDetailsRouting
  ],
  declarations: [
    friendWorkoutDetailsComponent
  ]
})
export class  FriendWorkoutDetailsModule { }
