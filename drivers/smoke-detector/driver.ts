// import {
//   BearerTokenAuthenticator,
//   SmartThingsClient,
// } from "@smartthings/core-sdk";
// import Homey from "homey";
// import PairSession from "homey/lib/PairSession";
import SmartThingsDriver from "../../classes/SmartThings/SmartThingsDriver";
// import { getHomeyCapabilitiesForDevice } from "../../classes/SmartThings/utils";

// class MyDriver extends Homey.Driver {
//   async onInit() {
//     this.log("MyDriver has been initialized");
//   }

//   async onPair(session: PairSession) {
//     let token = "";

//     session.setHandler("login", async (data: { password: string }) => {
//       token = data.password;
//       const client = new SmartThingsClient(new BearerTokenAuthenticator(token));
//       const credentialsAreValid = await client.locations.list();
//       return Boolean(credentialsAreValid);
//     });

//     session.setHandler("list_devices", async () => {
//       const client = new SmartThingsClient(new BearerTokenAuthenticator(token));
//       const myDevices = await client.devices.list({
//         capability: "smokeDetector",
//       });

//       const devices = myDevices.map((device) => {
//         const capabilities = getHomeyCapabilitiesForDevice(device);
//         return {
//           name: device.label ?? device.name,
//           data: { id: device.deviceId },
//           settings: { password: token },
//           capabilities,
//         };
//       });

//       return devices;
//     });
//   }
// }
class SmokeDetectorDriver extends SmartThingsDriver {
  capability = "smokeDetector";
}

module.exports = SmokeDetectorDriver;
