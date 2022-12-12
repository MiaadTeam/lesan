import { ActFn, Bson } from "../../../deps.ts";
import { country } from "../../../mod.ts";

export const getCountryFn: ActFn = async (body) => {
    const {
        set: { _id },
        get,
    } = body.details;

    const obId = new Bson.ObjectId(_id);

    // TODO : check should reture all depts that client wanted
    return await country.findOne({ _id: obId }, get);
};
