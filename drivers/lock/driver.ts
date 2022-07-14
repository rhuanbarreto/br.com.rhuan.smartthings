import {
  BearerTokenAuthenticator,
  SmartThingsClient,
} from "@smartthings/core-sdk";
import Homey from "homey";
import { PairSession } from "homey/lib/Driver";

class MyDriver extends Homey.Driver {
  /**
   * onInit is called when the driver is initialized.
   */
  async onInit() {
    this.log("MyDriver has been initialized");
  }

  /**
   * onPairListDevices is called when a user is adding a device and the 'list_devices' view is called.
   * This should return an array with the data of devices that are available for pairing.
   */
  async onPairListDevices() {
    return [
      // Example device data, note that `store` is optional
      // {
      //   name: 'My Device',
      //   data: {
      //     id: 'my-device',
      //   },
      //   store: {
      //     address: '127.0.0.1',
      //   },
      // },
    ];
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

module.exports = MyDriver;
