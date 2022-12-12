import { throwError } from "../../../../utils/throwError.ts";
import { ObjectId } from "../../../deps.ts";
import { ActFn } from "../../../deps.ts";
import { country, state } from "../../../mod.ts";

export const updateStateFn: ActFn = async (body) => {
    const {
        set: { _id, name, enName, geometries, countryId },
        get,
    } = body.details;

    const stateId = new ObjectId(_id);

    // find state with Id
    const foundState = await state.findOne({
        _id: stateId,
    }, { _id: 1 });

    /// check state is exist if not exist:throw Error else getPureIState
    foundState === undefined && throwError("state not found");

    const updatedIState: any = {}; // we declare an empty object then add a field one by one if the field is in input
    if (name) {
        updatedIState.name = name;
    }
    if (enName) {
        updatedIState.enName = enName;
    }
    if (geometries) {
        updatedIState.geometries = geometries;
    }
    // relations
    if (countryId) {
        updatedIState.country = await country.findOne(
            { _id: new ObjectId(countryId) },
            { _id: 1, name: 1, enName: 1 },
        );
    }

    // update with `$set` operator in db
    await state.updateOne({ _id: stateId }, { $set: updatedIState });
    // TODO: check update in puterRelation and InRealtion
    // and check if countryId updated check delete from preuios and insert in new country

    // if these pure field change then update in other models
    return get ? state.findOne({ _id: stateId }, get) : { _id: stateId };
};
