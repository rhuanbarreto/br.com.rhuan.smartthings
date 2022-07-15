import { Component, Device } from "@smartthings/core-sdk";
import capabilities from "./capabilities";

export function getHomeyCapability(smartThingsCapability: string) {
  if (!(smartThingsCapability in capabilities)) return null;
  return capabilities[smartThingsCapability].homeyCapability;
}

export function getSmartThingsCapability(homeyCapability: string | null) {
  if (homeyCapability === null) return null;
  return (
    Object.keys(capabilities).find(
      (key) => capabilities[key].homeyCapability === homeyCapability
    ) ?? null
  );
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
