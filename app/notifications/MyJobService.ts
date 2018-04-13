import { Component } from "@angular/core";
import {FirebaseService} from '../services';
const firebase = require("nativescript-plugin-firebase");
import * as dialogs from "ui/dialogs";

declare let has_notification: any;
declare let notification_data:any;
declare let token: any;

declare let com: any;
declare let android: any
declare let _super: any
//	constructor(private firebaseService: FirebaseService) {}

// class MyIntentService extends com.pip3r4o.android.app.IntentService {

// }
android.app.Service.extend("com.tns.notifications.SomeService", {
	onStartCommand: function(intent, flags, startId) {
		this.super.onStartCommand(intent, flags, startId);
		return android.app.Service.START_STICKY; 
	},

	onCreate: function() {
        console.log("##onBind create");
		function postNotification() {
			          console.log('hello from push');
			
			            var utils = require("utils/utils");
			            var context = utils.ad.getApplicationContext(); 
			            var builder = new android.app.Notification.Builder(context);
			            builder.setContentTitle("Exercise")
			                .setAutoCancel(true)
			                .setColor(android.R.color.holo_purple) 
			                .setContentText("Its been a while since you have exrcised using GroupXercise")
			                .setVibrate([100, 200, 100]) 
			                .setSmallIcon(android.R.drawable.btn_star_big_on);
			            var mainIntent = new android.content.Intent(context, com.tns.NativeScriptActivity.class);
			            var pendingIntent = android.app.PendingIntent.getActivity(context,
			                1,
			                mainIntent,
			                android.app.PendingIntent.FLAG_UPDATE_CURRENT);
			            builder.setContentIntent(pendingIntent);
			         
			            var manager = context.getSystemService(android.content.Context.NOTIFICATION_SERVICE);
			            manager.notify(1, builder.build());
			         }
		
			let message:{
			id: 1,
			title: 'The title',
			body: 'Recurs every minute until cancelled',
			ticker: 'The ticker',
			badge: 1,
			
			}
		//	this.addOnMessageReceivedCallback(message);
			// //has_notification = true;
			firebase.addOnPushTokenReceivedCallback(
				function(token) {
				
				}
			  ),


			  firebase.addOnMessageReceivedCallback((message) => {
			 
				console.log(`Title: ${message.title}`);
				console.log(`Body: ${message.body}`);
				// if your server passed a custom property called 'foo', then do this:
				console.log(`Value of 'foo': ${message.data.foo}`);
				dialogs.alert({
				  title: message.title,
				  message: message.data.foo,
				  okButtonText: "ok"
			  });
			});
	},

	onBind: function() {
		console.log("##onBind NOT YET IMPLEMENTED");
	}
})

module.exports = {}
