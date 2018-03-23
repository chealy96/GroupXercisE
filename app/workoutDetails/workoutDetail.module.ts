import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule } from "@angular/core";

import { workoutDetailRouting } from "./workoutDetail.routes";
import { workoutDetailComponent } from "./workoutDetail.component";

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    workoutDetailRouting
  ],
  declarations: [
    workoutDetailComponent
  ]
})
export class WorkoutDetailModule { }
