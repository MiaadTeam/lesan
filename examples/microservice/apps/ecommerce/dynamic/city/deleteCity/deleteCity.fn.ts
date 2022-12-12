import { throwError } from "../../../../utils/throwError.ts";
import { ActFn, ObjectId } from "../../../deps.ts";
import { city, state } from "../../../mod.ts";

export const deleteCityFn: ActFn = async (body) => {
    const {
        set: { _id },
    } = body.details;
    // check city exist
    const deletedCity = await city.findOne({
        _id: new ObjectId(_id),
    }, {});

    deletedCity === undefined
        && throwError("Id not valid");

    await city.remove({ _id: new ObjectId(_id) });

    return { _id: new ObjectId(_id) };
};
