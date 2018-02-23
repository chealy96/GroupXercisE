import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule } from "@angular/core";

import { exerciseDetailRouting } from "./exercise-detail.routes";
import { ExerciseDetailComponent } from "./exercise-detail.component";

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    exerciseDetailRouting
  ],
  declarations: [
    ExerciseDetailComponent
  ]
})
export class ExerciseDetailModule { }
