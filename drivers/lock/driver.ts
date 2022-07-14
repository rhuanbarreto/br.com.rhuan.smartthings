import {
  BearerTokenAuthenticator,
  SmartThingsClient,
} from "@smartthings/core-sdk";
import Homey from "homey";
import { PairSession } from "homey/lib/Driver";

class LockDriver extends Homey.Driver {
  async onInit() {
    this.log("MyDriver has been initialized");
  }

  async onPair(session: PairSession) {
    let token = "";

    session.setHandler("login", async (data: { password: string }) => {
      token = data.password;
      const client = new SmartThingsClient(new BearerTokenAuthenticator(token));
      const credentialsAreValid = await client.locations.list();
      this.log(credentialsAreValid);
      return Boolean(credentialsAreValid);
    });

    session.setHandler("list_devices", async () => {
      const client = new SmartThingsClient(new BearerTokenAuthenticator(token));
      const myDevices = await client.devices.list({ capability: "lock" });

      const devices = myDevices.map((device) => {
        return {
          name: device.label ?? device.name,
          data: {
            id: device.deviceId,
          },
          settings: {
            password: token,
          },
        };
      });

      return devices;
    });
  }
}

module.exports = LockDriver;
