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
  switch: {
    homeyCapability: "onoff",
    converter: (v) => v.switch.value === "on",
    command: (v) => (v ? "on" : "off"),
  },
  powerMeter: {
    homeyCapability: "measure_power",
    converter: (v) => v.power.value as number,
  },
  configuration: { homeyCapability: null, command: () => "configure" },
  refresh: { homeyCapability: null, command: () => "refresh" },
  healthCheck: { homeyCapability: null, command: () => "ping" },
  sensor: { homeyCapability: null },
  outlet: { homeyCapability: null },
  actuator: { homeyCapability: null },
};

export default capabilities;
