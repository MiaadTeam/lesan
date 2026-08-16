import { addUserSetup } from "./addUser/mod.ts";
import { getMeSetup } from "./getMe/mod.ts";
import { getUserSetup } from "./getUser/mod.ts";
import { loginUserSetup } from "./login/mod.ts";
import { updateUserSetup } from "./updateUser/mod.ts";
import { getUsersSetup } from "./getUsers/mod.ts";
import { removeUserSetup } from "./removeUser/mod.ts";
import { countUsersSetup } from "./countUsers/mod.ts";
import { updateUserRelationsSetup } from "./updateUserRelations/mod.ts";
import { dashboardStatisticSetup } from "./dashboardStatistic/mod.ts";

export const userSetup = () => {
  addUserSetup();
  getMeSetup();
  getUserSetup();
  loginUserSetup();
  updateUserSetup();
  getUsersSetup();
  removeUserSetup();
  countUsersSetup();
  updateUserRelationsSetup();
  dashboardStatisticSetup();
};
