import { throwError } from "../../../../utils/throwError.ts";
import { ActFn, ObjectId } from "../../../deps.ts";
import { city, state } from "../../../mod.ts";

export const addCityFn: ActFn = async (body) => {
    const {
        set: { name, enName, stateId, geometries },
        get,
    } = body.details;

    console.log(stateId);
    // TODO: check add to uouterRealation
    const createdCity = await city.insertOne({
        name: name,
        enName: enName,
        geometries: geometries,
    }, { state: new ObjectId(stateId) });
    return get ? city.findOne({ _id: new ObjectId(createdCity) }, get) : { _id: new ObjectId(createdCity) };
};
