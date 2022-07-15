import {
  BearerTokenAuthenticator,
  Component,
  SmartThingsClient,
} from "@smartthings/core-sdk";
import Homey from "homey";
import {
  getSmartThingsCapability,
  getValueConverter,
} from "../../classes/SmartThings";

class SmokeDetector extends Homey.Device {
  timer: NodeJS.Timeout[] = [];
  /**
   * onInit is called when the device is initialized.
   */
  async onInit() {
    const { id: deviceId, components } = this.getData();
    const client = new SmartThingsClient(
      new BearerTokenAuthenticator(this.getSetting("password"))
    );
    const capabilities = this.getCapabilities();
    capabilities.forEach((homeyCapability) => {
      const stCapability = getSmartThingsCapability(homeyCapability);
      const converter = getValueConverter(homeyCapability);
      if (!stCapability || !converter) return;
      const componentId = components.find((component: Component) =>
        component.capabilities.some((cap) => cap.id === stCapability)
      )?.id;
      if (!componentId) throw new Error("No component found!");
      this.timer.push(
        this.homey.setInterval(async () => {
          const result = await client.devices.getCapabilityStatus(
            deviceId,
            componentId,
            stCapability
          );
          this.setCapabilityValue(homeyCapability, converter(result)).catch(
            this.error
          );
        }, 30000)
      );
    });
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
    this.timer.map(this.homey.clearInterval);
  }

  async onUninit() {
    this.log("MyDevice has been uninitialized");
    this.timer.map(this.homey.clearInterval);
  }
}

module.exports = SmokeDetector;
