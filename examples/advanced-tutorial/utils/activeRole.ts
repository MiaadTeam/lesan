import { string } from "lesan";

export const activeRoleMixin = { activeRoleId: string() };

export const stripActiveRole = <T extends Record<string, unknown>>(
  set: T,
): Omit<T, "activeRoleId"> => {
  const { activeRoleId, ...rest } = set;
  return rest;
};
