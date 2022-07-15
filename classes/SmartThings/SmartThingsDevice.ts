import {
  BearerTokenAuthenticator,
  SmartThingsClient,
} from "@smartthings/core-sdk";
import Homey from "homey";
import STLogger from "./Logger";
import { getSmartThingsCapability, getValueConverter } from "./utils";

class SmartThingsDevice extends Homey.Device {
  timer: NodeJS.Timeout | undefined;
  /**
   * onInit is called when the device is initialized.
   */
  async onInit() {
    const { id } = this.getData(); // Get Device Id
    const capabilities = this.getCapabilities(); // Get Device Capabilities
    const client = new SmartThingsClient(
      new BearerTokenAuthenticator(this.getSetting("password")),
      { logger: new STLogger() }
    );

    this.timer = this.homey.setInterval(async () => {
      const result = await client.devices.getStatus(id);
      capabilities.forEach((homeyCapability) => {
        const stCapability = getSmartThingsCapability(homeyCapability);
        const converter = getValueConverter(homeyCapability);
        if (
          !stCapability ||
          !converter ||
          !result.components?.main[stCapability]
        )
          return;
        this.setCapabilityValue(
          homeyCapability,
          converter(result.components.main[stCapability])
        ).catch(this.error);
      });
    }, 10000);
    this.timer.refresh();
  }

  /**
   * onAdded is called when the user adds the device, called just after pairing.
   */
  async onAdded() {
    this.log("MyDevice has been added");
  }

  /**
   * onSettings is called when the user updates the device's settings.
   * @param {object} event the onSettings event data
   * @param {object} event.oldSettings The old settings object
   * @param {object} event.newSettings The new settings object
   * @param {string[]} event.changedKeys An array of keys changed since the previous version
   * @returns {Promise<string|void>} return a custom message that will be displayed
   */
  async onSettings({
    oldSettings: {},
    newSettings: {},
    changedKeys: {},
  }): Promise<string | void> {
    this.log("MyDevice settings where changed");
  }

  /**
   * onRenamed is called when the user updates the device's name.
   * This method can be used this to synchronise the name to the device.
   * @param {string} name The new name
   */
  async onRenamed(name: string) {
    this.log("MyDevice was renamed");
  }

  /**
   * onDeleted is called when the user deleted the device.
   */
  async onDeleted() {
    this.log("MyDevice has been deleted");
    this.homey.clearInterval(this.timer);
  }

  async onUninit() {
    this.log("MyDevice has been uninitialized");
    this.homey.clearInterval(this.timer);
  }
}

export default SmartThingsDevice;
