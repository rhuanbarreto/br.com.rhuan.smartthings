import { CapabilityStatus } from "@smartthings/core-sdk";

type CapabilityList = Record<
  string,
  {
    homeyCapability: string | null;
    converter?: (
      value: CapabilityStatus
    ) => number | boolean | string | null | undefined;
    command?: (
      value: number | string | object
    ) => string | { command: string; arguments: (string | number | object)[] };
    options?: {};
  }[]
>;

/**
 * SmartThings Deprecated Capabilities
 *
 * Reference in https://developer-preview.smartthings.com/docs/devices/capabilities/deprecated
 */
const deprecatedCapabilities: CapabilityList = {
  actuator: [], // Deprecated in favor of switch
  outlet: [],
  sensor: [],
};

/**
 * SmartThings Production Capabilities
 *
 * Reference in https://developer-preview.smartthings.com/docs/devices/capabilities/capabilities-reference/
 */
const productionCapabilities: CapabilityList = {
  accelerationSensor: [
    {
      homeyCapability: "alarm_motion",
      converter: (v) => v.acceleration.value === "active",
    },
  ],
  airQualitySensor: [
    {
      homeyCapability: "measure_co2.air_quality",
      converter: (v) => v.airQuality.value as number,
      options: {
        decimals: 0,
        min: 0,
        max: 100,
        units: "CAQI",
      },
    },
  ],
  alarm: [], // TODO - ENUM > 2
  audioMute: [
    {
      command: (v) => (v ? "mute" : "unmute"),
      converter: (v) => v.mute.value === "muted",
      homeyCapability: "volume_mute",
    },
  ],
  audioNotification: [], // TODO
  audioStream: [
    {
      homeyCapability: "speaker_track.url",
      converter: (v) => v.uri.value as string,
    },
  ],
  audioVolume: [
    {
      command: (v) => ({ command: "setVolume", arguments: [v] }),
      converter: (v) => v.volume.value as number,
      homeyCapability: "volume_set",
      options: {
        decimals: 0,
        min: 0,
        max: 100,
        step: 1,
        units: "%",
      },
    },
  ],
  battery: [
    {
      converter: (v) => v.battery.value as number,
      homeyCapability: "measure_battery",
      options: {
        min: 0,
        max: 100,
        units: "%",
      },
    },
  ],
  button: [], // TODO
  bypassable: [], // TODO
  carbonDioxideMeasurement: [], // TODO
  carbonMonoxideMeasurement: [], // TODO
  colorControl: [], // TODO
  colorTemperature: [], // TODO
  configuration: [
    {
      command: () => "configure",
      homeyCapability: null,
    },
  ],
  contactSensor: [], // TODO
  dewPoint: [], // TODO
  doorControl: [], // TODO
  dustSensor: [], // TODO
  energyMeter: [], // TODO
  equivalentCarbonDioxideMeasurement: [], // TODO
  execute: [], // TODO
  fanOscillationMode: [], // TODO
  fanSpeed: [], // TODO
  filterState: [], // TODO
  fineDustSensor: [], // TODO
  firmwareUpdate: [], // TODO
  formaldehydeMeasurement: [], // TODO
  healthCheck: [
    {
      command: () => "ping",
      homeyCapability: null,
    },
  ],
  illuminanceMeasurement: [], // TODO
  imageCapture: [], // TODO
  infraredLevel: [], // TODO
  locationMode: [], // TODO
  lock: [
    {
      command: (v) => (v ? "lock" : "unlock"),
      converter: (v) => v.lock.value === "locked",
      homeyCapability: "locked",
    },
  ],
  moldHealthConcern: [], // TODO
  momentary: [], // TODO
  motionSensor: [], // TODO
  networkMeter: [], // TODO
  notification: [], // TODO
  objectDetection: [], // TODO
  panicAlarm: [], // TODO
  pHMeasurement: [], // TODO
  powerMeter: [
    {
      converter: (v) => v.power.value as number,
      homeyCapability: "measure_power",
    },
  ],
  powerSource: [], // TODO
  presenceSensor: [
    {
      converter: (v) => v.presence.value === "present",
      homeyCapability: "alarm_motion",
    },
  ],
  refresh: [
    {
      command: () => "refresh",
      homeyCapability: "button.refresh",
      options: {
        maintenanceAction: true,
        title: { en: "Refresh Device" },
        desc: { en: "Send a device refresh command" },
      },
    },
  ],
  refrigeration: [], // TODO
  relativeHumidityMeasurement: [], // TODO
  remoteControlStatus: [], // TODO
  samsungTV: [], // TODO
  securitySystem: [], // TODO
  signalStrength: [], // TODO
  sleepSensor: [], // TODO
  smokeDetector: [
    {
      converter: (v) => v.smoke.value !== "clear",
      homeyCapability: "alarm_smoke",
    },
  ],
  soundPressureLevel: [], // TODO
  soundSensor: [], // TODO
  switchLevel: [], // TODO
  switch: [
    {
      command: (v) => (v ? "on" : "off"),
      converter: (v) => v.switch.value === "on",
      homeyCapability: "onoff",
    },
  ],
  tamperAlert: [
    {
      converter: (v) => v.tamper.value !== "clear",
      homeyCapability: "alarm_tamper",
    },
  ],
  temperatureAlarm: [
    {
      converter: (v) =>
        v.temperatureAlarm.value !== null &&
        v.temperatureAlarm.value !== "cleared",
      homeyCapability: "alarm_heat",
    },
  ],
  temperatureMeasurement: [
    {
      converter: (v) => v.temperature.value as number,
      homeyCapability: "measure_temperature",
    },
  ],
  testCapability: [],
  thermostatCoolingSetpoint: [], // TODO
  thermostatFanMode: [], // TODO
  thermostatHeatingSetpoint: [], // TODO
  thermostatMode: [], // TODO
  thermostatOperatingState: [], // TODO
  threeAxis: [], // TODO
  tone: [], // TODO
  tV: [], // TODO
  tvocMeasurement: [], // TODO
  ultravioletIndex: [], // TODO
  valve: [], // TODO
  veryFineDustSensor: [], // TODO
  videoCamera: [], // TODO
  videoCapture: [], // TODO
  videoStream: [], // TODO
  voltageMeasurement: [], // TODO
  webrtc: [], // TODO
  waterSensor: [], // TODO
  windowShadeLevel: [], // TODO
  windowShadePreset: [], // TODO
  windowShade: [], // TODO
  zwMultichannel: [], // TODO
};

/**
 * SmartThings Proposed Capabilities
 *
 * Reference in https://developer-preview.smartthings.com/docs/devices/capabilities/proposed
 */
const proposedCapabilities: CapabilityList = {
  mediaInputSource: [
    {
      command: (v) => ({
        command: "setInputSource",
        arguments: [v],
      }),
      converter: (v) => v.inputSource.value as string,
      homeyCapability: "media_input_source",
    },
  ],
  mediaPlayback: [
    {
      command: (v) => (v ? "play" : "pause"),
      converter: (v) => v.playbackStatus.value === "playing",
      homeyCapability: "speaker_playing",
    },
  ],
  powerConsumptionReport: [
    {
      converter: (v) => (v.powerConsumption.value as { power: number }).power,
      homeyCapability: "measure_power",
    },
  ],
  tvChannel: [
    {
      converter: (v) => v.tvChannel.value as string,
      homeyCapability: "speaker_album",
    },
    {
      converter: (v) => v.tvChannelName.value as string,
      homeyCapability: "speaker_track",
    },
  ],
  washerOperatingState: [
    {
      command: (v) => ({
        command: "setMachineState",
        arguments: [v],
      }),
      converter: (v) => v.machineState.value as string,
      homeyCapability: "washer_operating_state",
    },
  ],
};

const vendorSpecificCapabilities: CapabilityList = {};

export default {
  ...deprecatedCapabilities,
  ...vendorSpecificCapabilities,
  ...proposedCapabilities,
  ...productionCapabilities,
};
