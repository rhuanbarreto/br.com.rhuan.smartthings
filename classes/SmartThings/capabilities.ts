import { CapabilityStatus } from "@smartthings/core-sdk";

const capabilities: Record<
  string,
  {
    homeyCapability: string | null;
    converter?: (
      value: CapabilityStatus
    ) => number | boolean | string | null | undefined;
    command?: (
      value: number | string | object
    ) => string | { command: string; arguments: (string | number | object)[] };
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
  washerOperatingState: {
    homeyCapability: "washer_operating_state",
    converter: (v) => v.machineState.value as string,
    command: (v) => ({ command: "setMachineState", arguments: [v] }),
  },
  powerConsumptionReport: {
    homeyCapability: "measure_power",
    converter: (v) => (v.powerConsumption.value as { power: number }).power,
  },
  audioVolume: {
    homeyCapability: "volume_set",
    converter: (v) => v.volume.value as number,
    command: (v) => ({ command: "setVolume", arguments: [v] }),
  },
  mediaPlayback: {
    homeyCapability: "speaker_playing",
    converter: (v) => v.playbackStatus.value === "playing",
    command: (v) => (v ? "play" : "pause"),
  },
  mediaInputSource: {
    homeyCapability: "media_input_source",
    converter: (v) => v.inputSource.value as string,
    command: (v) => ({ command: "setInputSource", arguments: [v] }),
  },
  audioMute: {
    homeyCapability: "volume_mute",
    converter: (v) => v.mute.value === "muted",
    command: (v) => (v ? "mute" : "unmute"),
  },
  presenceSensor: {
    homeyCapability: "alarm_motion",
    converter: (v) => v.presence.value === "present",
  },
  configuration: { homeyCapability: null, command: () => "configure" },
  refresh: { homeyCapability: null, command: () => "refresh" },
  healthCheck: { homeyCapability: null, command: () => "ping" },
  sensor: { homeyCapability: null }, // Deprecated
  outlet: { homeyCapability: null }, // Deprecated in favor of switch
  actuator: { homeyCapability: null }, // Deprecated
};

export default capabilities;
