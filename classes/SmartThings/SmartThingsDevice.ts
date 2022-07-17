import {
  BearerTokenAuthenticator,
  SmartThingsClient,
} from "@smartthings/core-sdk";
import Homey from "homey";
import STLogger from "./Logger";
import {
  getSmartThingsCapability,
  getSmartThingsCommand,
  getValueConverter,
} from "./utils";

class SmartThingsDevice extends Homey.Device {
  timer: NodeJS.Timeout | undefined;

  private get client() {
    const token = this.homey.settings.get("token") as string;
    if (!token) throw new Error("No personal access token present");
    return new SmartThingsClient(new BearerTokenAuthenticator(token), {
      logger: new STLogger(),
    });
  }

  async onInit() {
    this.initializeListeners();
    this.initializeCapabilityPolling();
  }

  initializeListeners() {
    const { id } = this.getData();
    const capabilities = this.getCapabilities();
    capabilities.forEach((homeyCapability) => {
      const stCommand = getSmartThingsCommand(homeyCapability);
      const stCapability = getSmartThingsCapability(homeyCapability);
      if (!stCommand || !stCapability) return;
      this.registerCapabilityListener(homeyCapability, async (value) => {
        const commandResult = stCommand(value);
        const finalResult =
          typeof commandResult === "string" ||
          typeof commandResult === "number" ||
          typeof commandResult === "boolean"
            ? { command: commandResult }
            : commandResult;
        await this.client.devices.executeCommand(id, {
          capability: stCapability,
          ...finalResult,
        });
      });
    });
  }

  initializeCapabilityPolling() {
    const { id } = this.getData();
    const capabilities = this.getCapabilities();
    this.timer = this.homey.setInterval(async () => {
      const result = await this.client.devices.getStatus(id);
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
    }, 5000); // 5000 is the minimum SmartThings accepts without hitting limits
    this.timer.refresh();
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

  async onRenamed(name: string) {
    if (name === this.getName()) return;
    const { id } = this.getData();
    this.client.devices.update(id, { label: name });
  }

  async onDeleted() {
    this.homey.clearInterval(this.timer);
  }

  async onUninit() {
    this.homey.clearInterval(this.timer);
  }
}

export default SmartThingsDevice;
