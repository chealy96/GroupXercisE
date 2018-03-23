import {Component, ViewChild , ElementRef,  OnInit, NgZone} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Router, ActivatedRoute} from '@angular/router';
import { ExerciseService, WorkoutService, FriendsService } from "../services";
import {Exercise, Workout} from "../models";
import * as enums from 'ui/enums';
import * as imageSource from 'image-source';
import { isAndroid } from "platform";
import { View } from "ui/core/view";
import { topmost } from "ui/frame";

import * as fs from "file-system";

var imageModule = require("ui/image");
var img;

@Component({
  moduleId: module.id,
  selector: "gf-workoutDetaildetail",
  templateUrl: "workoutDetail.html"
})
export class workoutDetailComponent implements OnInit {
    

  exercises: any;
  id: string;
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
        private workoutService: WorkoutService,
        private freindService: FriendsService
      //  private utilsService: UtilsService
    ) {}

    @ViewChild("CB1") FirstCheckBox: ElementRef;

    public toggleCheck() {
        this.FirstCheckBox.nativeElement.toggle();
    }
 
    public getCheckProp(exer : any) {
    //  this.workoutService.updateworkout(exer, )
        console.log('checked prop value = ' + this.FirstCheckBox.nativeElement.checked);
    }
 ngOnInit() {
  
   this.sub = this.route.params.subscribe((params: any) => {
      this.id = params['id'];
      this.workoutService.getMyWorkout(this.id).subscribe((workout) => {
        this.ngZone.run(() => {
          for (let prop in workout) {
            //props
            if (prop === "uid") {
              this.id = workout[prop];
            }
            if (prop === "name") {
              this.name = workout[prop];
            }
            if (prop === "exercises") {
              this.exercises = workout[prop];
            }
                                                     
          }
        });
      });
      this.freindService.getFreindsWorkout(this.id).subscribe((workout) => {
        this.ngZone.run(() => {
          for (let prop in workout) {
            //props
            if (prop === "uid") {
              this.id = workout[prop];
            }
            if (prop === "name") {
              this.name = workout[prop];
            }
            if (prop === "exercises") {
              this.exercises = workout[prop];
            }                                         
          }
        });
      });
    });  
  }

  viewDetail(id: any){
  //  this.exerciseService.getExerciseList();
    this.router.navigate(["/list-detail", id]);
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