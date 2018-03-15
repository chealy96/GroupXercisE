import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { SearchComponent } from "./search.component";

import { ModuleWithProviders }  from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../auth-guard.service";

const SearchRoutes: Routes = [
    { path: "", component: SearchComponent }
];
export const SearchRoutingModule: ModuleWithProviders = RouterModule.forChild(SearchRoutes);

// @NgModule({
//     imports: [NativeScriptRouterModule.forChild(routes)],
//     exports: [NativeScriptRouterModule]
// })
// export class SearchRoutingModule { }
