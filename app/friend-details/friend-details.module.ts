import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NgModule } from "@angular/core";

import { friendDetailsRouting } from "./friend-details.routes";
import { FriendDetailsComponent } from "./friend-details.component";

@NgModule({
  imports: [
    NativeScriptModule,
    NativeScriptFormsModule,
    friendDetailsRouting
  ],
  declarations: [
    FriendDetailsComponent
  ]
})
export class FriendDetailsModule { }
