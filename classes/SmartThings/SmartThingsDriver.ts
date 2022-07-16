import {
  BearerTokenAuthenticator,
  SmartThingsClient,
} from "@smartthings/core-sdk";
import Homey from "homey";
import PairSession from "homey/lib/PairSession";
import STLogger from "./Logger";
import { getHomeyCapabilitiesForDevice } from "./utils";

class SmartThingsDriver extends Homey.Driver {
  capability: string = "";

  async onPair(session: PairSession) {
    let token = "";

    session.setHandler("login", async (data: { password: string }) => {
      token = data.password;
      const client = new SmartThingsClient(
        new BearerTokenAuthenticator(token),
        { logger: new STLogger() }
      );
      const credentialsAreValid = await client.locations.list();
      return Boolean(credentialsAreValid);
    });

    session.setHandler("list_devices", async () => {
      const client = new SmartThingsClient(
        new BearerTokenAuthenticator(token),
        { logger: new STLogger() }
      );
      const myDevices = await client.devices.list({
        capability: this.capability,
      });

      const devices = myDevices.map((device) => {
        const capabilities = getHomeyCapabilitiesForDevice(device);
        return {
          name: device.label ?? device.name,
          data: { id: device.deviceId },
          settings: { password: token },
          capabilities,
        };
      });

      return devices;
    });
  }
}

export default SmartThingsDriver;
