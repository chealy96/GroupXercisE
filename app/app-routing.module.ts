//import { NgModule } from "@angular/core";
//import { Routes } from "@angular/router";
//import { NativeScriptRouterModule } from "nativescript-angular/router";

import { AuthGuard } from "./auth-guard.service";

export const authProviders = [
    AuthGuard
  ];
  export const appRoutes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", loadChildren: "./home/home.module#HomeModule" },
    { path: "browse", loadChildren: "./browse/browse.module#BrowseModule" },
    { path: "search", loadChildren: "./search/search.module#SearchModule" },
    { path: "workout", loadChildren: "./workout/workout.module#WorkoutModule" },
    { path: "exercises", loadChildren: "./exercises/exercise.module#ExerciseModule" },
    { path: "settings", loadChildren: "./settings/settings.module#SettingsModule" }
];


