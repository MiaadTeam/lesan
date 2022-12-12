import { ActFn, Bson } from "../../../deps.ts";
import { city } from "../../../mod.ts";

export const getCityFn: ActFn = async (body) => {
    const {
        set: { _id },
        get,
    } = body.details;

    const obId = new Bson.ObjectId(_id);

    // TODO : check should reture all depts that client wanted
    return await city.findOne({ _id: obId }, get);
};
