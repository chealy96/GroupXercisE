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

//import * as camera from "nativescript-camera";
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
  // camera.requestPermissions();
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

// takePhoto() {
//   let options = {
//             width: 300,
//             height: 300,
//             keepAspectRatio: true,
//             saveToGallery: true
//         };
//     camera.takePicture(options)
//         .then(imageAsset => {
//             imageSource.fromAsset(imageAsset).then(res => {
//                 this.image = res;
//                 //save the source image to a file, then send that file path to firebase
//                 this.saveToFile(this.image);
//             })
//         }).catch(function (err) {
//             console.log("Error -> " + err.message);
//         });
// }

// saveToFile(res){
//   let imgsrc = res;
//         this.imagePath = this.utilsService.documentsPath(`photo-${Date.now()}.png`);
//         imgsrc.saveToFile(this.imagePath, enums.ImageFormat.png);       
// }


// editGift(id: string){
//   if(this.image){
//     //upload the file, then save all
//     this.firebaseService.uploadFile(this.imagePath).then((uploadedFile: any) => {
//           this.uploadedImageName = uploadedFile.name;
//           //get downloadURL and store it as a full path;
//           this.firebaseService.getDownloadUrl(this.uploadedImageName).then((downloadUrl: string) => {
//             this.firebaseService.editGift(id,this.description,downloadUrl).then((result:any) => {
//               alert(result)
//             }, (error: any) => {
//                 alert(error);
//             });
//           })
//         }, (error: any) => {
//           alert('File upload error: ' + error);
//         });
//   }
//   else {
//     //just edit the description
//     this.firebaseService.editDescription(id,this.description).then((result:any) => {
//         alert(result)
//     }, (error: any) => {
//         alert(error);
//     });
//   }    
// }

}