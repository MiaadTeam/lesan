import { feature_array } from "../models/featureConstants.ts";

type Feature = typeof feature_array[number];

type UserWithFeatures = {
  features?: { feature: Feature }[];
  units?: { features?: { feature: Feature }[] }[];
};

type UnitWithFeatures = {
  features?: { feature: Feature }[];
};

export function hasFeature(user: UserWithFeatures, feature: Feature): boolean {
  if (user.features?.some((f) => f.feature === feature)) return true;
  if (user.units?.some((unit) => hasUnitFeature(unit, feature))) return true;
  return false;
}

export function hasUnitFeature(
  unit: UnitWithFeatures,
  feature: Feature,
): boolean {
  return unit.features?.some((f) => f.feature === feature) ?? false;
}
