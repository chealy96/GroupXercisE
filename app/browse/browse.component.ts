import { Component, OnInit, ViewChild , ChangeDetectionStrategy } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import {FirebaseService} from '../services';
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import {connreq} from '../models/request.model';
import { SearchBar } from "ui/search-bar";
import { User } from "../models/user.model";
import { ObservableArray } from "data/observable-array";
import { RequestsProvider } from '../services';
import firebase = require("nativescript-plugin-firebase");
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

    private arrayItems: Array<User> = [];
    public filteredusers: ObservableArray<User> = new ObservableArray<User>();

    constructor(private routerExtensions: RouterExtensions,
        private firebaseService: FirebaseService,
        public requestservice: RequestsProvider) {
            this.firebaseService.getallusers().then((res: any) => {
               
                this.temparr = res;
                this.arrayItems = res;
                this.filteredusers = new ObservableArray<User>();
                this.arrayItems.forEach(item => {
                    this.filteredusers.push(item);
                });
          })
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

    /* ***********************************************************
    * Use the sideDrawerTransition property to change the open/close animation of the drawer.
    *************************************************************/
    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
    }

    get sideDrawerTransition(): DrawerTransitionBase {
        return this._sideDrawerTransition;
    }

    /* ***********************************************************
    * According to guidelines, if you have a drawer on your page, you should always
    * have a button that opens it. Use the showDrawer() function to open the app drawer section.
    *************************************************************/
    onDrawerButtonTap(): void {
        this.drawerComponent.sideDrawer.showDrawer();
    }

    logout() {
        this.firebaseService.logout();
        this.routerExtensions.navigate(["/login"], { clearHistory: true } );
      }
}
