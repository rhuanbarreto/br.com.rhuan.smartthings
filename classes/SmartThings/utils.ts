import { Component, Device } from "@smartthings/core-sdk";
import capabilities from "./capabilities";

export function getHomeyCapability(smartThingsCapability: string) {
  if (!(smartThingsCapability in capabilities)) return null;
  return capabilities[smartThingsCapability].homeyCapability;
}

export function getSmartThingsCapability(homeyCapability: string | null) {
  if (!homeyCapability) return null;
  return (
    Object.keys(capabilities).find(
      (key) => capabilities[key].homeyCapability === homeyCapability
    ) ?? null
  );
}

export function getSmartThingsCommand(homeyCapability: string | null) {
  if (!homeyCapability) return null;
  const stCapability = getSmartThingsCapability(homeyCapability);
  if (!stCapability) return null;
  return capabilities[stCapability].command;
}

export function getValueConverter(homeyCapability: string | null) {
  if (!homeyCapability) return null;
  const key = getSmartThingsCapability(homeyCapability);
  if (!key) return null;
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
