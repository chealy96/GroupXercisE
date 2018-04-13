const utils = require("utils/utils"); 
//declare var android
//declare let com: any;
import { Component,OnInit,Injectable } from "@angular/core";
declare let com: any;
declare let android: any
declare let _super: any
// //function 
 
@Injectable()
export class scheduleJob  { 
  constructor(
  ){}
	// context = utils.ad.getApplicationContext();
	// ngOnInit(): void {
	// 	console.log("sceduler from job1")
	// 	this.scheduleJobs( utils.ad.getApplicationContext());
        
  
	//    }
  //  run(context){
	//console.log("sceduler from jobbbbbbbbbbbbb");
    //scheduleJob(context);z
    

        scheduleJobs(context) {
        // // Create a component from the JobService that should be triggered
        // console.log("sceduler from jobbbbbbbbbbbbb")
        // var component = new android.content.ComponentName(context, com.tns.notifications.SomeService.class);

        // // Set the id of the job to something meaningful for you
        // const builder = new android.app.job.JobInfo.Builder(1, component);

        // // Optional: Set how often the task should be triggered. The minimum is 15min.
        // builder.setPeriodic(30*1000);
        
        // // Optional: Set additional requirements under what conditions your job should be triggered
        // builder.setRequiresCharging(true);

        // const jobScheduler = context.getSystemService(android.content.Context.JOB_SCHEDULER_SERVICE);
        // console.log("Job Scheduled: " + jobScheduler.schedule(builder.build()));
        }
   // }
}

// android.app.Service.extend("com.tns.notifications.SomeService", {
// 	onStartCommand: function(intent, flags, startId) {
// 		this.super.onStartCommand(intent, flags, startId);
// 		return android.app.Service.START_STICKY; 
// 	},

// 	onCreate: function() {
//         console.log("##onBind create");
// 		//function postNotification() {
// 			          console.log('hello from push');
			
// 			            // Do something. For example, fetch fresh data from backend to create a rich notification?
// 			            var utils = require("utils/utils");
// 			            var context = utils.ad.getApplicationContext(); // get a reference to the application context in Android
// 			            var builder = new android.app.Notification.Builder(context);
// 			            builder.setContentTitle("Scheduled Notification")
// 			                .setAutoCancel(true)
// 			                .setColor(android.R.color.holo_purple) // optional
// 			                .setContentText("This notification has been triggered by Notification Service")
// 			                .setVibrate([100, 200, 100]) // optional
// 			                .setSmallIcon(android.R.drawable.btn_star_big_on);
// 			                // will open main NativeScript activity when the notification is pressed
// 			            var mainIntent = new android.content.Intent(context, com.tns.NativeScriptActivity.class);
// 			            var pendingIntent = android.app.PendingIntent.getActivity(context,
// 			                1,
// 			                mainIntent,
// 			                android.app.PendingIntent.FLAG_UPDATE_CURRENT);
// 			            builder.setContentIntent(pendingIntent);
// 			          //  builder.setDeleteIntent(getDeleteIntent(context));
// 			            var manager = context.getSystemService(android.content.Context.NOTIFICATION_SERVICE);
// 			            manager.notify(1, builder.build());
// 			//          }
// 	},

// 	onBind: function(intent) {
// 		console.log("##onBind NOT YET IMPLEMENTED");
// 	}
// })

// module.exports = {}


// // com.pip3r4o.android.app.IntentService.extend("com.tns.notifications.NotificationIntentService" /* give your class a valid name as it will need to be declared in the AndroidManifest later */, {
// //     onHandleIntent: function (intent) {
        
// //         var action = intent.getAction();
// //         if ("ACTION_START" == action) {
// //             postNotification();
// //         } else if ('ACTION_STOP' == action) {
// //          /* get the system alarm manager and cancel all pending alarms, which will stop the service from executing periodically  */
// //         }
// //         android.support.v4.content.WakefulBroadcastReceiver.completeWakefulIntent(intent);  
// //     }           
// //  });