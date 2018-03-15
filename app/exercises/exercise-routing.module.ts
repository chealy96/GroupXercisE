import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ExerciseComponent } from "./exercise.component";


import { ModuleWithProviders }  from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../auth-guard.service";



const ExerciseRoutes: Routes = [
  { path: "", component: ExerciseComponent, canActivate: [AuthGuard] },
  { path: "exercise-detail", loadChildren: "./exercise-detail/exercise-detail.module#ExerciseDetailModule" }
];
export const ExerciseRoutingModule: ModuleWithProviders = RouterModule.forChild(ExerciseRoutes);