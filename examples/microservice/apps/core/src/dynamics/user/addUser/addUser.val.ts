import { userInp } from "../../../../declarations/selectInp.ts";
import { number, object, string } from "../../../../deps.ts";
import { selectStruct } from "../../../../mod.ts";

export const addUserValidator = () => {
    return object({
        set: object({
            name: string(),
            age: number(),
        }),
        get: selectStruct<userInp>("user", { country: { user: 1 } }),
    });
};
