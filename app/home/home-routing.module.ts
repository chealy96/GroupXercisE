import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { HomeComponent } from "./home.component";


import { ModuleWithProviders }  from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../auth-guard.service";



const HomeRoutes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
];
export const HomeRoutingModule: ModuleWithProviders = RouterModule.forChild(HomeRoutes);
/*const routes: Routes = [
    { path: "", component: HomeComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class HomeRoutingModule { }*/
