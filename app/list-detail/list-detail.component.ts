import {Component, OnInit, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router, ActivatedRoute} from '@angular/router';
import { ExerciseService, WorkoutService, FriendsService } from "../services";
import {Exercise} from "../models";
import * as enums from 'ui/enums';
import * as imageSource from 'image-source';
import { isAndroid } from "platform";
import { View } from "ui/core/view";
import { topmost } from "ui/frame";

//import * as camera from "nativescript-camera";
import * as fs from "file-system";

var imageModule = require("ui/image");
var img;

@Component({
  moduleId: module.id,
  selector: "gf-list-detail",
  templateUrl: "list-detail.html"
})
export class ListDetailComponent implements OnInit {
  
  id: any;
  name: string;
  description: string;
  image: any;
  title: string;
  url: string;
  instructions:  Array<string> = [];
  details: string;
  level: string;
  muscle: string;
  muscleImage: string;
  equipment : string;
  type: string;
  reps: string;
  restTime : string;
  sets: string;
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
        private workoutService:WorkoutService,
        private friendService: FriendsService
    ) {}

 ngOnInit() {
  
   this.sub = this.route.params.subscribe((params: any) => {
      this.id = params['id'];
        this.workoutService.getMyExeercise(this.id).subscribe((exercise) => {
          this.ngZone.run(() => {
            for (let prop in exercise) {
              //props
              if (prop === "id") {
                this.id = exercise[prop];
              }
              if (prop === "title") {
                this.title = exercise[prop];
              }
              if (prop === "description") {
                this.description = exercise[prop];
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
              if (prop === "reps") {
                this.reps = exercise[prop];
              }    
              if (prop === "restTime") {
                this.restTime = exercise[prop];
              }      
              if (prop === "sets") {
                this.sets = exercise[prop];
              }                                          
            }
          });
        });

        this.exerciseService.getMyExeercise(this.id).subscribe((exercise) => {
          this.ngZone.run(() => {
            for (let prop in exercise) {
              //props
              if (prop === "id") {
                this.id = exercise[prop];
              }
              if (prop === "name") {
                this.name = exercise[prop];
              }
              if (prop === "description") {
                this.description = exercise[prop];
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
              if (prop === "reps") {
                this.reps = exercise[prop];
              }    
              if (prop === "restTime") {
                this.restTime = exercise[prop];
              }      
              if (prop === "sets") {
                this.sets = exercise[prop];
              }                                          
            }
          });
        });
      
        // this.friendService.getFreindsExercise(this.id).subscribe((exercise) => {
        //   this.ngZone.run(() => {
        //     for (let prop in exercise) {
        //       //props
        //       if (prop === "id") {
        //         this.id = exercise[prop];
        //       }
        //       if (prop === "name") {
        //         this.name = exercise[prop];
        //       }
        //       if (prop === "description") {
        //         this.description = exercise[prop];
        //       }
        //       if (prop === "url") {
        //         this.url = exercise[prop];
        //       }
        //       if (prop === "equipment") {
        //         this.equipment = exercise[prop];
        //       }
        //       if (prop === "level") {
        //         this.level = exercise[prop];
        //       }    
        //       if (prop === "muscle") {
        //         this.muscle = exercise[prop];
        //       }    
        //       if (prop === "instructions") {
        //         this.instructions= exercise[prop];
        //       }    
        //       if (prop === "muscleImagesrc") {
        //         this.muscleImage = exercise[prop];
        //       }    
        //       if (prop === "images") {
        //         this.images = exercise[prop];
        //       }      
        //       if (prop === "type") {
        //         this.type = exercise[prop];
        //       }
        //       if (prop === "reps") {
        //         this.reps = exercise[prop];
        //       }    
        //       if (prop === "restTime") {
        //         this.restTime = exercise[prop];
        //       }      
        //       if (prop === "sets") {
        //         this.sets = exercise[prop];
        //       }                                          
        //     }
        //   });
        // });
    });  
  }

  navigateBack(){
    topmost().goBack();
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