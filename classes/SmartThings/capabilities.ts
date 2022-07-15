import { CapabilityStatus } from "@smartthings/core-sdk";

const capabilities: Record<
  string,
  {
    homeyCapability: string | null;
    converter?: (
      value: CapabilityStatus
    ) => number | boolean | string | null | undefined;
  }
> = {
  battery: {
    homeyCapability: "measure_battery",
    converter: (v) => v.battery.value as number,
  },
  temperatureMeasurement: {
    homeyCapability: "measure_temperature",
    converter: (v) => v.temperature.value as number,
  },
  smokeDetector: {
    homeyCapability: "alarm_smoke",
    converter: (v) => v.smoke.value !== "clear",
  },
  tamperAlert: {
    homeyCapability: "alarm_tamper",
    converter: (v) => v.tamper.value !== "clear",
  },
  temperatureAlarm: {
    homeyCapability: "alarm_heat",
    converter: (v) => v.temperatureAlarm.value !== null,
  },
  lock: {
    homeyCapability: "locked",
    converter: (v) => v.lock.value === "locked",
  },
  configuration: { homeyCapability: null },
  sensor: { homeyCapability: null },
  refresh: { homeyCapability: null },
  healthCheck: { homeyCapability: null },
  actuator: { homeyCapability: null },
};

export type SupportedSTCapabilities = keyof typeof capabilities;

export default capabilities;
