import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { SharedModule } from "../shared/shared.module";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        HomeRoutingModule,
        SharedModule,
    ],
    declarations: [
        HomeComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class HomeModule { }
