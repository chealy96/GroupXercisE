import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { HomeComponent } from "./home.component";


import { ModuleWithProviders }  from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../auth-guard.service";



const HomeRoutes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "friend-details", loadChildren: "./friend-details/friend-details.module#FriendDetailsModule" },
  { path: "workoutDetail", loadChildren: "./workoutDetails/workoutDetail.module#WorkoutDetailModule" }

];
export const HomeRoutingModule: ModuleWithProviders = RouterModule.forChild(HomeRoutes);

