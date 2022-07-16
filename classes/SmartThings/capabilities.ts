import { CapabilityStatus } from "@smartthings/core-sdk";

const capabilities: Record<
  string,
  {
    homeyCapability: string | null;
    converter?: (
      value: CapabilityStatus
    ) => number | boolean | string | null | undefined;
    command?: (value: number | boolean | string) => string;
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
    converter: (v) =>
      v.temperatureAlarm.value !== null &&
      v.temperatureAlarm.value !== "cleared",
  },
  lock: {
    homeyCapability: "locked",
    converter: (v) => v.lock.value === "locked",
    command: (v) => (v ? "lock" : "unlock"),
  },
  configuration: { homeyCapability: null, command: () => "configure" },
  sensor: { homeyCapability: null },
  refresh: { homeyCapability: null, command: () => "refresh" },
  healthCheck: { homeyCapability: null, command: () => "ping" },
  actuator: { homeyCapability: null },
};

export default capabilities;
