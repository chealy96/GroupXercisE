import { ModuleWithProviders }  from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { FriendDetailsComponent } from "./friend-details.component";

const friendDetailsRoutes: Routes = [
  { path: "friend-details/:id", component: FriendDetailsComponent },
];
export const friendDetailsRouting: ModuleWithProviders = RouterModule.forChild(friendDetailsRoutes);