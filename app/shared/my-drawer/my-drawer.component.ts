import { Component, Input, OnInit } from "@angular/core";
//import {User} from '../models/user.model';
import firebase = require("nativescript-plugin-firebase");

/* ***********************************************************
* Keep data that is displayed in your app drawer in the MyDrawer component class.
* Add new data objects that you want to display in the drawer here in the form of properties.
*************************************************************/
@Component({
    selector: "MyDrawer",
    moduleId: module.id,
    templateUrl: "./my-drawer.component.html",
    styleUrls: ["./my-drawer.component.css"]
})
        
export class MyDrawerComponent implements OnInit {
    /* ***********************************************************
    * The "selectedPage" is a component input property.
    * It is used to pass the current page title from the containing page component.
    * You can check how it is used in the "isPageSelected" function below.
    *************************************************************/
    profile : any;
    holder: any;
    email: string;
    name: string;
    profilePhoto: string;

    @Input() selectedPage: string;
    
    ngOnInit(): void {
        /* ***********************************************************
        * Use the MyDrawerComponent "onInit" event handler to initialize the properties data values.
        *************************************************************/
        this.profile = JSON.stringify(firebase.getCurrentUser());

        this.holder = JSON.parse(this.profile);
        this.profile = this.holder.__zone_symbol__value;
        this.email = this.profile.email;
        this.profilePhoto =   this.profile.profileImageURL;
        this.name =   this.profile.name;
    }

    /* ***********************************************************
    * The "isPageSelected" function is bound to every navigation item on the <MyDrawerItem>.
    * It is used to determine whether the item should have the "selected" class.
    * The "selected" class changes the styles of the item, so that you know which page you are on.
    *************************************************************/
    isPageSelected(pageTitle: string): boolean {
        return pageTitle === this.selectedPage;
    }
}
