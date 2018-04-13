import { AuthGuard } from "./auth-guard.service";

export const authProviders = [
    AuthGuard
  ];
  export const appRoutes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", loadChildren: "./home/home.module#HomeModule" },
    { path: "browse", loadChildren: "./browse/browse.module#BrowseModule" },
    { path: "workout", loadChildren: "./workout/workout.module#WorkoutModule" },
    { path: "exercises", loadChildren: "./exercises/exercise.module#ExerciseModule" }
];


