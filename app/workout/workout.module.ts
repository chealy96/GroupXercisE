import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { SharedModule } from "../shared/shared.module";
import { WorkoutdRoutingModule } from "./workout-routing.module";
import { WorkoutComponent } from "./workout.component";

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        WorkoutdRoutingModule,
        SharedModule
    ],
    declarations: [
        WorkoutComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class WorkoutModule { }
