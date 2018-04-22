import { Component, OnInit} from "@angular/core";
const utils = require("utils/utils"); 
import { scheduleJob } from "./notifications/job-scheduler";

declare let com: any;
declare let android: any
declare let _super: any
//this.test();
@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})

export class AppComponent implements OnInit {
   test(){
    const utils = require("utils/utils"); 

     console.log("sceduler from app component");

     var context = utils.ad.getApplicationContext();

     var component = new android.content.ComponentName(context, com.tns.notifications.SomeService.class);
   
     const builder = new android.app.job.JobInfo.Builder(1, component);
   
     // runs every 2 hours.
     builder.setPeriodic(1000  * 60 * 120);
     
     builder.setRequiresCharging(true);
   
    const jobScheduler = context.getSystemService(android.content.Context.JOB_SCHEDULER_SERVICE);
    console.log("Job Scheduled: " + jobScheduler.schedule(builder.build()));     
   }
    ngOnInit(): void {
   //   this.test();
  }

 
}

        

