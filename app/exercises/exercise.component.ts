import { Component, OnInit, ViewChild,  AfterViewInit  } from "@angular/core";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import {ExerciseService ,FirebaseService} from '../services';
import { RequestsProvider } from '../services';
import {connreq} from '../models/request.model';
import {Observable} from "rxjs";
import { Router } from '@angular/router';
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { exercise } from "../models/pred-exercises.model";
import { ObservableArray } from "data/observable-array";
import { SearchBar } from "ui/search-bar";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";

@Component({
    selector: "Exercise",
    moduleId: module.id,
    templateUrl: "./exercise.component.html"
})


export class ExerciseComponent implements OnInit {
    myrequests ;
    temparr = [];
    public items: Array<string> = ["bicep"];
    public isBusy = true;
    private arrayItems: Array<exercise> = [];
    public filteredexercises: ObservableArray<exercise> = new ObservableArray<exercise>();
    public exercise: exercise;
    public exercises$: Observable<any>;
    public message$: Observable<any>;

    constructor(private routerExtensions: RouterExtensions,
    private exerciseService: ExerciseService,
    private firebaseService: FirebaseService,
    private router: Router,
    private requestservice: RequestsProvider
    ) {
       
        this.exerciseService.getPredExerciseList().subscribe((res: any) => {
            this.arrayItems = res;
            this.temparr = res;
            this.filteredexercises = new ObservableArray<exercise>();
            this.arrayItems.forEach(item => {
                this.filteredexercises.push(item);
            });
            this.isBusy = false;
        })
       // this.items.push("bicep");
    }
    onSearchBarLoaded(event) {
        if (event.object.android) {
          setTimeout(() => {
            event.object.dismissSoftInput();
            event.object.android.clearFocus();
          }, 0);
        }
      }
    viewDetail(id: string){
        this.router.navigate(["/exercise-detail", id]);
     }

    searchexercise(args) {
        let searchBar = <SearchBar>args.object;
        let searchValue = searchBar.text.toLowerCase();

        this.filteredexercises = new ObservableArray<exercise>();
        if (searchValue !== "") {
            for (let i = 0; i < this.arrayItems.length; i++) {
                if (this.arrayItems[i].title.toLowerCase().indexOf(searchValue) !== -1) {
                    this.filteredexercises.push(this.arrayItems[i]);
                }
            }
        }
    } 
    onClear(args) {
        let searchBar = <SearchBar>args.object;
        searchBar.text = "";
        searchBar.hint = "Search for an Exercise and press enter";
        this.filteredexercises = new ObservableArray<exercise>();
        this.arrayItems.forEach(item => {
         this.filteredexercises.push(item);
        });  
    }
    @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
    private _sideDrawerTransition: DrawerTransitionBase;

    ngOnInit(): void {
        this._sideDrawerTransition = new SlideInOnTopTransition();
    //   this.filteredexercises = <any>this.exerciseService.getExerciseList();
    }

    public onchange(args: SelectedIndexChangedEventData) {
        // let searchBar = <SearchBar>args.object;
        // let searchValue = searchBar.text.toLowerCase();

        // this.filteredexercises = new ObservableArray<exercise>();
        // if (searchValue !== "") {
        //     for (let i = 0; i < this.arrayItems.length; i++) {
        //         if (this.arrayItems[i].muscle.toLowerCase().indexOf(searchValue) !== -1) {
        //             this.filteredexercises.push(this.arrayItems[i]);
        //         }
        //     }
        // }
        console.log(`Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`);
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
