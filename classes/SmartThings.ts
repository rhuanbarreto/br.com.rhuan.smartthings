import { CapabilityStatus, Component, Device } from "@smartthings/core-sdk";

const capabilities: Record<
  string,
  {
    homeyCapability: string | null;
    converter?: (value: CapabilityStatus) => number | boolean | string | null;
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
  configuration: { homeyCapability: null },
  smokeDetector: {
    homeyCapability: "alarm_smoke",
    converter: (v) => v.smoke.value !== "clear",
  },
  sensor: { homeyCapability: null },
  healthCheck: { homeyCapability: null },
  tamperAlert: {
    homeyCapability: "alarm_tamper",
    converter: (v) => v.tamper.value !== "clear",
  },
  temperatureAlarm: {
    homeyCapability: "alarm_heat",
    converter: (v) => v.temperatureAlarm.value !== null,
  },
};

export function getHomeyCapability(smartThingsCapability: string) {
  return capabilities[smartThingsCapability].homeyCapability;
}

export function getSmartThingsCapability(homeyCapability: string | null) {
  if (homeyCapability === null) return null;
  return Object.keys(capabilities).find(
    (key) => capabilities[key].homeyCapability === homeyCapability
  )!;
}

export function getValueConverter(homeyCapability: string | null) {
  if (homeyCapability === null) return null;
  const key = getSmartThingsCapability(homeyCapability);
  if (key === null) return null;
  return capabilities[key].converter;
}

export function getHomeyCapabilitiesForDevice(device: Device) {
  const getComponentCapabilities = (component: Component) =>
    component.capabilities.map((c) => c.id);
  return device.components
    ?.map(getComponentCapabilities)
    .flat()
    .map(getHomeyCapability)
    .filter(Boolean);
}
