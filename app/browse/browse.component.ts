import { Component, OnInit, ViewChild , ChangeDetectionStrategy } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import {FirebaseService, } from '../services';
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import {connreq} from '../models/request.model';
import { SearchBar } from "ui/search-bar";
import { User } from "../models/user.model";
import { ObservableArray } from "data/observable-array";
import { RequestsProvider, FriendsService } from '../services';
import firebase = require("nativescript-plugin-firebase");
import { TabView, SelectedIndexChangedEventData, TabViewItem } from "ui/tab-view";
import { StackLayout } from "ui/layouts/stack-layout";
import { Router } from '@angular/router';

@Component({
    selector: "Browse",
    moduleId: module.id,
    templateUrl: "./browse.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrowseComponent implements OnInit {
     id: any;
    newrequest = {} as connreq;
    temparr = [];
    myrequests ;
    myfriends
    hold;
    public tabSelectedIndex: number;

    private arrayItems: Array<User> = [];
    public filteredusers: ObservableArray<User> = new ObservableArray<User>();

    constructor(private routerExtensions: RouterExtensions,
        private firebaseService: FirebaseService,
        public requestservice: RequestsProvider,
        private friendservice: FriendsService,
        private router: Router) {

        this.firebaseService.getallusers().then((res: any) => {
            this.temparr = res;
            this.arrayItems = res;
            this.filteredusers = new ObservableArray<User>();
            this.arrayItems.forEach(item => {
                //   if(!this.friendservice.friendsCheck(item)){
                this.filteredusers.push(item);
                //   }
            });
        })
        this.loadData();
        this.tabSelectedIndex = 0;
    }

    loadData() {
        this.friendservice.getmyfriends().subscribe((res1: any) => {
            this.myfriends =[];
            this.myfriends = res1;
        })
         this.requestservice.getmyrequests().subscribe((res: any) => {
            this.myrequests =[];
            this.myrequests = res;
        })
    }

    changeTab() {
        if (this.tabSelectedIndex === 0) {
            this.tabSelectedIndex = 1;
        } else if (this.tabSelectedIndex === 1) {
            this.tabSelectedIndex = 2;
        } else if (this.tabSelectedIndex === 2) {
            this.tabSelectedIndex = 0;
        }
    }

    accept(item) {
        this.requestservice.acceptrequest(item).then((res: any) => {
        if (res.success) {
            alert({
                title: 'Friend added',
                okButtonText: 'Okay'
                });
            let sentuser =  this.myrequests.indexOf(item);
            this.myrequests.splice(sentuser, 1);
            this.tabSelectedIndex = 2;
            }    
        })
    }
        
    ignore(item) {
    this.requestservice.deleterequest(item).then((res: any) => {
        if (res.success) {
            let sentuser =  this.myrequests.indexOf(item);
            this.myrequests.splice(sentuser, 1);
            }    
        }).catch((err) => {
        alert("err");
    })
    }

    viewProfile(item: User){
        this.router.navigate(["/friend-details",item.id]);
    }

    searchuser(args) {
        let searchBar = <SearchBar>args.object;
        let searchValue = searchBar.text.toLowerCase();

        this.filteredusers = new ObservableArray<User>();
        if (searchValue !== "") {
            for (let i = 0; i < this.arrayItems.length; i++) {
                if (this.arrayItems[i].displayName.toLowerCase().indexOf(searchValue) !== -1) {
                    this.filteredusers.push(this.arrayItems[i]);
                }
            }
        }
    }
    
    sendreq(recipient) {
          // this.id =  this.firebaseService.getUserId();
        this.newrequest.sender =  this.requestservice.doWebGetCurrentUser();
        this.newrequest.recipient = recipient.UID;
        if (this.newrequest.sender === this.newrequest.recipient)
          alert('You are your friend always');
        else {
          let successalert = {
            title: 'Request sent',
            subTitle: 'Your request was sent to ' + recipient.displayName,
            buttons: ['ok']
          };
        
        this.requestservice.sendrequest(this.newrequest).then((res: any) => {
            if (res.success) {
              alert(successalert);
              let sentuser = this.filteredusers.indexOf(recipient);
              this.filteredusers.splice(sentuser, 1);
            }
          }).catch((err) => {
            alert(err);
          })
        }
    }
     onClear(args) {
       
    let searchBar = <SearchBar>args.object;
    searchBar.text = "";
    searchBar.hint = "Search for a country and press enter";

    this.filteredusers = new ObservableArray<User>();
    this.arrayItems.forEach(item => {
     this.filteredusers.push(item);
    });
    }
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;

    private _sideDrawerTransition: DrawerTransitionBase;

    
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
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
