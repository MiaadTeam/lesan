import { throwError } from "./throwError.ts";
import type { MyContext } from "./context.ts";
import { coreApp } from "../mod.ts";
import { hasFeature } from "./checkFeature.ts";

export type RoleCheck = {
  roles: string[];
  features?: string[];
  getScope?: (
    body: any,
  ) => { scopeType: string; scopeId: string } | null;
};

export const grantAccess = (checks: RoleCheck[]) => {
  const checkAccess = () => {
    const { user }: MyContext = coreApp.contextFns
      .getContextModel() as MyContext;

    if (user.isGhost) return;

    const body = (coreApp.contextFns.getContextModel() as any)?.body;
    const activeRoleId = body?.details?.set?.activeRoleId;

    if (!activeRoleId) {
      return throwError("activeRoleId is required");
    }

    const activeRole = user.roles?.find((r) => r.roleId === activeRoleId);

    if (!activeRole) {
      return throwError("Active role not found");
    }

    for (const check of checks) {
      if (!check.roles.includes(activeRole.name)) continue;

      if (check.features && check.features.length > 0) {
        for (const feature of check.features) {
          if (!hasFeature(user, feature as any)) {
            throwError(`Missing feature: ${feature}`);
          }
        }
      }

      if (!check.getScope) return;

      const scope = check.getScope(body);
      if (
        scope &&
        activeRole.scopeType === scope.scopeType &&
        activeRole.scopeId === scope.scopeId
      ) {
        return;
      }
    }

    throwError("You cant do this");
  };

  return checkAccess;
};

export const requireFeature = (feature: string) => {
  const checkFeature = () => {
    const { user }: MyContext = coreApp.contextFns
      .getContextModel() as MyContext;

    if (user.isGhost) return;

    if (!hasFeature(user, feature as any)) {
      throwError(`Missing feature: ${feature}`);
    }
  };

  return checkFeature;
};
