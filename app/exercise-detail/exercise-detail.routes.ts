import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ExerciseDetailComponent } from "./exercise-detail.component";

const exerciseDetailRoutes: Routes = [
  { path: "exercise-detail/:id", component: ExerciseDetailComponent },
];
export const exerciseDetailRouting: ModuleWithProviders = RouterModule.forChild(exerciseDetailRoutes);