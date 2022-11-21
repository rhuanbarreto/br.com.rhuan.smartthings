import { CapabilityStatus } from "@smartthings/core-sdk";
import { deprecatedCapabilities } from "./capabilities/deprecated";
import { productionCapabilities } from "./capabilities/production";
import { proposedCapabilities } from "./capabilities/proposed";
import { vendorSpecificCapabilities } from "./capabilities/vendorSpecific";

export type CapabilityList = Record<
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

export default {
  ...deprecatedCapabilities,
  ...vendorSpecificCapabilities,
  ...proposedCapabilities,
  ...productionCapabilities,
};
