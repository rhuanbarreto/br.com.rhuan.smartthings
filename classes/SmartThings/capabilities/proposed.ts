import { CapabilityList } from "../capabilities";

/**
 * SmartThings Proposed Capabilities
 *
 * Reference in https://developer-preview.smartthings.com/docs/devices/capabilities/proposed
 */
export const proposedCapabilities: CapabilityList = {
  activityLightingMode: [], // TODO - ENUM
  activitySensor: [], // TODO - ENUM
  airConditionerFanMode: [], // TODO
  airConditionerMode: [], // TODO
  airFlowDirection: [], // TODO
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
