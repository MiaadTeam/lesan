import { throwError } from "../../../../utils/throwError.ts";
import { ActFn, ObjectId } from "../../../deps.ts";
import { city, state } from "../../../mod.ts";

export const updateCityFn: ActFn = async (body) => {
    const {
        set: { _id, name, enName, geometries, stateId },
        get,
    } = body.details;

    const cityId = new ObjectId(_id);
    const foundedCity = await city.findOne({ _id: cityId }, { _id: 1 });

    !foundedCity && throwError("there is no city with this ID");

    const newState = stateId
        ? await state.findOne(
            { _id: new ObjectId(stateId) },
            { _id: 1, name: 1, enName: 1, geometries: 1, country: 1 },
        )
        : null;

    newState !== null || undefined
        ? await city.findOne(
            { _id: cityId },
            {
                $set: {
                    name,
                    enName,
                    geometries,
                    state: {
                        _id: newState._id,
                        name: newState.name,
                        enName: newState.enName,
                        geometries: newState.geometries,
                    },
                    country: newState.country,
                },
            },
        )
        : await city.updateOne(
            { _id: cityId },
            {
                $set: {
                    name,
                    enName,
                    geometries,
                },
            },
        );
    return get ? city.findOne({ _id: cityId }, get) : { _id: cityId };
};
