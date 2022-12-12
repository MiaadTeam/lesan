import { ActFn } from "../../../../deps.ts";
import { getAtcsWithServices, user } from "../../../../mod.ts";
export const addUserFn: ActFn = async (body) => {
    const acts = getAtcsWithServices();

    /*
  *  @LOG @DEBUG @INFO
  *  This log written by ::==> {{ syd }}
  *
  *  Please remove your log after debugging
  */
    console.group("acts ------ inside addUserFn");
    console.log(" ============= ");
    console.log();
    console.info(acts, " ------ ");
    console.log();
    console.log(" ============= ");
    console.groupEnd();

    const {
        set: { name, age },
        get,
    } = body.details;

    await user.insertOne({
        name,
        age,
    });

    return {
        what: "what you said",
    };
};
