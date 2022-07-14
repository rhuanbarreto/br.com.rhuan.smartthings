import Homey from "homey";

class SmartThingsApp extends Homey.App {
  async onInit() {
    this.log("App Initialized");
    // const deviceId = await this.homey.cloud.getHomeyId();
    // const myWebhook = await this.homey.cloud.createWebhook(
    //   Homey.env.WEBHOOK_ID,
    //   Homey.env.WEBHOOK_SECRET,
    //   { deviceId }
    // );
    // this.log(myWebhook);
    // myWebhook.on("message", (args) => {
    //   this.log("Got a webhook message!");
    //   this.log(args);
    //   this.log("headers:", args.headers);
    //   this.log("query:", args.query);
    //   this.log("body:", args.body);
    // });
  }
}

module.exports = SmartThingsApp;
