import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NSModuleFactoryLoader } from "nativescript-angular/router";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import {registerElement} from "nativescript-angular/element-registry";
registerElement("FilterableListpicker", () => require("nativescript-filterable-listpicker").FilterableListpicker);

import { appRoutes,authProviders } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginModule } from "./login/login.module";
import { HomeModule } from "./home/home.module";
import { BrowseModule } from "./browse/browse.module";
import { SharedModule } from "./shared/shared.module";
import { WorkoutModule } from "./workout/workout.module";
import { ListDetailModule } from "./list-detail/list-detail.module";
import { WorkoutDetailModule } from "./workoutDetails/workoutDetail.module";
import { FriendWorkoutDetailsModule } from "./friendWorkoutDetails/friendWorkoutDetails.module";
import { ExerciseDetailModule } from "./exercise-detail/exercise-detail.module";
import { FriendDetailsModule } from "./friend-details/friend-details.module";
import { SearchModule } from "./search/search.module";
import { ExerciseModule } from "./exercises/exercise.module";
import { SettingsModule } from "./settings/settings.module";
import { AccordionModule } from "nativescript-accordion/angular";
import { TNSCheckBoxModule } from 'nativescript-checkbox/angular';


import { BackendService, FirebaseService, RequestsProvider, ExerciseService, FriendsService, WorkoutService} from "./services";
@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptHttpModule,
        NativeScriptRouterModule,
        NativeScriptRouterModule.forRoot(appRoutes),
        LoginModule,
        HomeModule,
        BrowseModule,
        SharedModule,
        WorkoutModule,
        ListDetailModule,
        ExerciseDetailModule,
        FriendDetailsModule,
        FriendWorkoutDetailsModule,
        SearchModule,
        ExerciseModule,
        SettingsModule,
        AccordionModule,
        WorkoutDetailModule,
        TNSCheckBoxModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        { provide: NgModuleFactoryLoader, useClass: NSModuleFactoryLoader },
        authProviders,
        BackendService,
        FirebaseService,
        RequestsProvider,
        ExerciseService,
        FriendsService,
        WorkoutService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
