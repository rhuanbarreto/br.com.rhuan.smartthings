import {
  BearerTokenAuthenticator,
  SmartThingsClient,
} from "@smartthings/core-sdk";
import Homey, { Device } from "homey";
import PairSession from "homey/lib/PairSession";
import STLogger from "./Logger";
import { getHomeyCapabilitiesForDevice } from "./utils";

class SmartThingsDriver extends Homey.Driver {
  capability: string = "";

  async onPair(session: PairSession) {
    const pat = this.homey.settings.get("personalAccessToken");
    if (await this.validateSTToken(pat)) {
      // @ts-ignore
      await session.showView("list_devices");
    }

    session.setHandler("personal_token", async (token: string) => {
      const valid = await this.validateSTToken(token);
      if (valid) this.homey.settings.set("personalAccessToken", token);
      return valid;
    });

    session.setHandler("list_devices", async () => {
      const myDevices = await this.client().devices.list({
        capability: this.capability,
      });
      const devices = myDevices?.map((device) => {
        const capabilities = getHomeyCapabilitiesForDevice(device);
        return {
          name: device.label ?? device.name,
          data: { id: device.deviceId },
          capabilities,
        };
      });

      return devices;
    });
  }

  onRepair(session: PairSession, device: Device) {
    session.setHandler("personal_token", async (token: string) => {
      // Refresh token
      const valid = await this.validateSTToken(token);
      if (!valid) return false;
      this.homey.settings.set("personalAccessToken", token);

      const stDevice = await this.client().devices.get(device.getData().id);

      // Update device capabilities
      await Promise.all(
        device.getCapabilities().map((cap) => device.removeCapability(cap))
      );
      await Promise.all(
        getHomeyCapabilitiesForDevice(stDevice)?.map((cap) =>
          device.addCapability(cap)
        ) ?? []
      );

      return true;
    });
  }

  private client(pat?: string) {
    const token =
      pat ?? (this.homey.settings.get("personalAccessToken") as string);
    if (!token) throw new Error("No personal access token present");
    return new SmartThingsClient(new BearerTokenAuthenticator(token), {
      logger: new STLogger(),
    });
  }

  async validateSTToken(token: string) {
    if (!token) return false;
    const client = this.client(token);
    const valid = await client.locations.list().catch(() => false);
    return Boolean(valid);
  }
}

export default SmartThingsDriver;
