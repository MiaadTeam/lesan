import { throwError } from "../../../../utils/throwError.ts";
import { ObjectId } from "../../../deps.ts";
import { ActFn } from "../../../deps.ts";
import { country, state } from "../../../mod.ts";

export const addStateFn: ActFn = async (body) => {
    const {
        set: { name, enName, countryId, geometries },
        get,
    } = body.details;

    const inState = await state.insertOne({
        name,
        enName,
        geometries,
    }, { country: new ObjectId(countryId) });
    return Object.keys(get).length != 0
        ? await state.findOne({ _id: new ObjectId(inState) }, get)
        : { _id: inState };
};
