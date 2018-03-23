import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { workoutDetailComponent } from "./workoutDetail.component";

const workoutDetailRoutes: Routes = [
  { path: "workoutDetail/:id", component: workoutDetailComponent },
];
export const workoutDetailRouting: ModuleWithProviders = RouterModule.forChild(workoutDetailRoutes);