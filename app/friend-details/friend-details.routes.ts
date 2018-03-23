import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { FriendDetailsComponent } from "./friend-details.component";

const friendDetailsRoutes: Routes = [
  { path: "friend-details/:UID", component: FriendDetailsComponent },
  { path: "workoutDetail", loadChildren: "./workoutDetails/workoutDetail.module#WorkoutDetailModule" }

];
export const friendDetailsRouting: ModuleWithProviders = RouterModule.forChild(friendDetailsRoutes);