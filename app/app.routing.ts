//import { NgModule } from "@angular/core";
//import { NativeScriptRouterModule } from "nativescript-angular/router";
//import { Routes } from "@angular/router";

//import { ItemsComponent } from "./item/items.component";
//import { ItemDetailComponent } from "./item/item-detail.component";

import { AuthGuard } from "./auth-guard.service";

export const authProviders = [
    AuthGuard
  ];
  
//export const routes: Routes = [
export const   appRoutes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", loadChildren: "./home/home.module#HomeModule" },
    { path: "browse", loadChildren: "./browse/browse.module#BrowseModule" },
    { path: "search", loadChildren: "./search/search.module#SearchModule" },
    { path: "featured", loadChildren: "./featured/featured.module#FeaturedModule" },
    { path: "settings", loadChildren: "./settings/settings.module#SettingsModule" },
  //  { path: "items", component: ItemsComponent },
   // { path: "item/:id", component: ItemDetailComponent },
];

//@NgModule({
//    imports: [NativeScriptRouterModule.forRoot(routes)],
 //   exports: [NativeScriptRouterModule]
//})
//export class AppRoutingModule { }