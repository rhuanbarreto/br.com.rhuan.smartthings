import { Component, Device } from "@smartthings/core-sdk";
import isTruthy from "../../utils/isTruthy";
import capabilities from "./capabilities";

export function getHomeyCapability(smartThingsCapability: string) {
  if (!(smartThingsCapability in capabilities)) return null;
  return capabilities[smartThingsCapability]
    .map((cap) => cap.homeyCapability)
    .filter(isTruthy);
}

export function getHomeyCapabilityOptions(smartThingsCapability: string) {
  if (!(smartThingsCapability in capabilities)) return null;
  return capabilities[smartThingsCapability]
    .map(({ homeyCapability, options }) =>
      homeyCapability && options ? { [homeyCapability]: options } : null
    )
    .filter(isTruthy);
}

export function getSmartThingsCapability(homeyCapability: string | null) {
  if (!homeyCapability) return null;
  return (
    Object.keys(capabilities).find((key) =>
      capabilities[key].some((cap) => cap.homeyCapability === homeyCapability)
    ) ?? null
  );
}

export function getSmartThingsCommand(homeyCapability: string | null) {
  if (!homeyCapability) return null;
  const stCapability = getSmartThingsCapability(homeyCapability);
  if (!stCapability) return null;
  return capabilities[stCapability].find(
    (cap) => cap.homeyCapability === homeyCapability
  )?.command;
}

export function getValueConverter(homeyCapability: string | null) {
  if (!homeyCapability) return null;
  const key = getSmartThingsCapability(homeyCapability);
  if (!key) return null;
  return capabilities[key].find(
    (cap) => cap.homeyCapability === homeyCapability
  )?.converter;
}

export function getHomeyCapabilitiesForDevice(device: Device) {
  const getComponentCapabilities = (component: Component) =>
    component.capabilities.map((c) => c.id);
  return device.components
    ?.map(getComponentCapabilities)
    .flat()
    .map(getHomeyCapability)
    .flat()
    .filter(isTruthy);
}

export function getHomeyCapabilitiesOptionsForDevice(device: Device) {
  const getComponentCapabilities = (component: Component) =>
    component.capabilities.map((c) => c.id);
  return device.components
    ?.map(getComponentCapabilities)
    .flat()
    .map(getHomeyCapabilityOptions)
    .flat()
    .filter(isTruthy)
    .reduce((prev, curr) => ({ ...prev, ...curr }), {});
}
