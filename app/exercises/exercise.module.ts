import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { SharedModule } from "../shared/shared.module";

import { ExerciseRoutingModule } from "./exercise-routing.module";
import { ExerciseComponent } from "./exercise.component";

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        ExerciseRoutingModule,
        SharedModule,
    ],
    declarations: [
        ExerciseComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class ExerciseModule { }