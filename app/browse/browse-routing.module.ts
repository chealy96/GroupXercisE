import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { BrowseComponent } from "./browse.component";

import { ModuleWithProviders }  from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../auth-guard.service";

const BrowserRoutes: Routes = [
    { path: "", component: BrowseComponent, canActivate: [AuthGuard] },
  ];
  export const BrowseRoutingModule: ModuleWithProviders = RouterModule.forChild(BrowserRoutes);

