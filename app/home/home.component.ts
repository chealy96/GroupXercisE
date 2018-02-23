import { Component, OnInit, ViewChild } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import {FirebaseService} from '../services';
import { RequestsProvider } from '../services';
import {connreq} from '../models/request.model';
import {Observable} from "rxjs";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { alert , prompt } from "tns-core-modules/ui/dialogs";
import { TabView, SelectedIndexChangedEventData, TabViewItem } from "ui/tab-view";
@Component({
    selector: "Home", 
    moduleId: module.id,
    templateUrl: "./home.component.html"
})


export class HomeComponent implements OnInit {
    myrequests ;
    hold;
       constructor(private routerExtensions: RouterExtensions,
        private firebaseService: FirebaseService,
        private requestservice: RequestsProvider
        ) {
            this.myrequests  = this.requestservice.getmyrequests();//.then((res: any) => {
               //  this.hold;
              //this.myrequests = res;
             // this.myrequests = this.requestservice.userdetails;
         // }) 
        }

    
    accept(item) {
        this.requestservice.acceptrequest(item).then(() => {
            
            let newalert = alert({
            title: 'Friend added',
            okButtonText: 'Okay'
            });
            
        })
        }
        
        ignore(item) {
        this.requestservice.deleterequest(item).then(() => {
        
        }).catch((err) => {
            alert("err");
        })
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
