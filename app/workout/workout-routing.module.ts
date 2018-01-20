import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { WorkoutComponent } from "./workout.component";

import { ModuleWithProviders }  from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../auth-guard.service";

const WorkoutRoutes: Routes = [
    { path: "", component: WorkoutComponent, canActivate: [AuthGuard]  },
    { path: "list-detail", loadChildren: "./list-detail/list-detail.module#ListDetailModule" }
];
export const WorkoutdRoutingModule: ModuleWithProviders = RouterModule.forChild(WorkoutRoutes);


