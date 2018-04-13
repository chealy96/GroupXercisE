import {Component, OnInit, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router, ActivatedRoute} from '@angular/router';
import { ExerciseService } from "../services";
import {exercise} from "../models";
import * as enums from 'ui/enums';
import * as imageSource from 'image-source';
import { isAndroid } from "platform";
import { View } from "ui/core/view";
import { TextView } from "ui/text-view";
import { topmost } from "ui/frame";
import * as fs from "file-system";

var imageModule = require("ui/image");
var img;

@Component({
  moduleId: module.id,
  selector: "gf-exercise-detail",
  templateUrl: "exercise-detail.html"
})
export class ExerciseDetailComponent implements OnInit {
  
  title: string;
  url: string;
  instructions:  Array<string> = [];
  details: string;
  level: string;
  muscle: string;
  muscleImage: string;
  equipment : string;
  type: string;
  //images: string[];
  images: Array<string> = [];
  private sub: any;
  private imagePath: string;
  private uploadedImageName: string;
  private uploadedImagePath: string;
  public gift: Observable<any>;
  
  
  constructor(
        private route: ActivatedRoute,
        private router: Router,
        private ngZone: NgZone,
        private exerciseService: ExerciseService,
      //  private utilsService: UtilsService
    ) {}

  navigateBack(){
  topmost().goBack();
  }


 ngOnInit() {
   this.sub = this.route.params.subscribe((params: any) => {
      this.title = params['id'];
      this.exerciseService.getExercise(this.title).subscribe((exercise) => {
        this.ngZone.run(() => {
          for (let prop in exercise) {
            //props
            if (prop === "title") {
              this.title = exercise[prop];
            }
            if (prop === "url") {
              this.url = exercise[prop];
            }
            if (prop === "equipment") {
              this.equipment = exercise[prop];
            }
            if (prop === "level") {
              this.level = exercise[prop];
            }    
            if (prop === "muscle") {
              this.muscle = exercise[prop];
            }    
            if (prop === "instructions") {
              this.instructions= exercise[prop];
            }    
            if (prop === "muscleImagesrc") {
              this.muscleImage = exercise[prop];
            }    
            if (prop === "images") {
              this.images = exercise[prop];
            }      
            if (prop === "type") {
              this.type = exercise[prop];
            }               
          }
        });
      });
    });  
  }


}