import Homey from "homey";

class SmartThingsApp extends Homey.App {
  async onInit() {
    this.log("App Initialized");
  }
}

module.exports = SmartThingsApp;
