import { Bson, ObjectId } from "../../../deps.ts";
import { ActFn } from "../../../deps.ts";
import { country } from "../../../mod.ts";

export const deleteCountryFn: ActFn = async (body) => {
    const {
        set: { _id },
        get,
    } = body.details;
    // TODO : checl all of inrelation should deleted all not allow deleted , and all outerRelation should be deleted
    await country.remove({ _id: _id });
    return { _id: new Bson.ObjectId(_id) };
};
