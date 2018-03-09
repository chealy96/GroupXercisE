import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NSModuleFactoryLoader } from "nativescript-angular/router";
import { NativeScriptHttpModule } from "nativescript-angular/http";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { appRoutes,authProviders } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginModule } from "./login/login.module";
import { HomeModule } from "./home/home.module";
import { BrowseModule } from "./browse/browse.module";
import { SharedModule } from "./shared/shared.module";
import { WorkoutModule } from "./workout/workout.module";
import { ListDetailModule } from "./list-detail/list-detail.module";
import { ExerciseDetailModule } from "./exercise-detail/exercise-detail.module";
import { FriendDetailsModule } from "./friend-details/friend-details.module";
import { SearchModule } from "./search/search.module";
import { ExerciseModule } from "./exercises/exercise.module";

import { BackendService, FirebaseService, RequestsProvider, ExerciseService, FriendsService} from "./services";
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
        SearchModule,
        ExerciseModule 
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
        FriendsService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
