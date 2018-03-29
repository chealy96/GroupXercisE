import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { friendWorkoutDetailsComponent } from "./friendWorkoutDetails.component";

const friendWorkoutDetailsRoutes: Routes = [
  { path: "friendWorkoutDetails/:id", component: friendWorkoutDetailsComponent },
];
export const friendWorkoutDetailsRouting: ModuleWithProviders = RouterModule.forChild(friendWorkoutDetailsRoutes);