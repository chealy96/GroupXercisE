import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import {FirebaseService} from '../services';
import { RequestsProvider, FriendsService } from '../services';
import {connreq} from '../models/request.model';
import {Observable} from "rxjs";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { alert , prompt } from "tns-core-modules/ui/dialogs";
import { TabView, SelectedIndexChangedEventData, TabViewItem } from "ui/tab-view";
import { Router } from '@angular/router';
import { User } from "../models/user.model";
import { StackLayout } from "ui/layouts/stack-layout";
import firebase = require("nativescript-plugin-firebase");

@Component({
    selector: "Home", 
    moduleId: module.id,
    templateUrl: "./home.component.html"
})

export class HomeComponent implements OnInit {
    user: User;

   // myrequests ;
   // myfriends
  //  hold;
    name: string;
    description: string;
    imagepath: string;
    image: any;
    
    profile : any;
    holder: any;
    email: string;
    profilePhoto: string;
    public tabSelectedIndex: number;
    constructor(private routerExtensions: RouterExtensions,
    private firebaseService: FirebaseService,
    private requestservice: RequestsProvider,
    private friendService: FriendsService,
    private router: Router
    ) {
        this.tabSelectedIndex = 0;
        this.user = new User();
    }
    // loadData() {
    //     this.friendService.getmyfriends().subscribe((res1: any) => {
    //         this.myfriends =[];
    //         this.myfriends = res1;
    //     })
    //      this.requestservice.getmyrequests().subscribe((res: any) => {
    //         this.myrequests =[];
    //         this.myrequests = res;
    //     })
    // }

    changeTab() {
        if (this.tabSelectedIndex === 0) {
            this.tabSelectedIndex = 1;
        } else if (this.tabSelectedIndex === 1) {
            this.tabSelectedIndex = 2;
        } else if (this.tabSelectedIndex === 2) {
            this.tabSelectedIndex = 0;
        }
    }
    // accept(item) {
    //     this.requestservice.acceptrequest(item).then((res: any) => {
    //     if (res.success) {
    //         alert({
    //             title: 'Friend added',
    //             okButtonText: 'Okay'
    //             });
    //         let sentuser =  this.myrequests.indexOf(item);
    //         this.myrequests.splice(sentuser, 1);
    //         this.tabSelectedIndex = 2;
    //         }    
    //     })
    // }
    
    updateProfile(){
        this.firebaseService.updateProfile(this.user).then((result: any) => {
          
          });
    }
    // ignore(item) {
    // this.requestservice.deleterequest(item).then((res: any) => {
    //     if (res.success) {
    //         let sentuser =  this.myrequests.indexOf(item);
    //         this.myrequests.splice(sentuser, 1);
    //         }    
    //    }).catch((err) => {
    //     alert("err");
    // })
    // }

    viewProfile(item: User){
        this.router.navigate(["/friend-details",item.id]);
        }


    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    private _sideDrawerTransition: DrawerTransitionBase;

   
    
   
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
     //   this.loadData();
     this.profile = JSON.stringify(firebase.getCurrentUser());

     this.holder = JSON.parse(this.profile);
     this.profile = this.holder.__zone_symbol__value;
     this.email = this.profile.email;
     this.profilePhoto =   this.profile.profileImageURL;
     this.name =   this.profile.name;
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }
    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }

    logout() {
        this.firebaseService.logout();
        this.routerExtensions.navigate(["/login"], { clearHistory: true } );
      }
}
