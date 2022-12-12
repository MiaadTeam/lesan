import { ObjectId } from "../../../deps.ts";
import { ActFn } from "../../../deps.ts";
import { country } from "../../../mod.ts";

export const updateCountryFn: ActFn = async (body) => {
    const {
        set: { _id, name, enName, countryCode, geometries },
        get,
    } = body.details;
    const countryId = new ObjectId(_id);

    const updatedCountry: any = {};
    if (name) {
        updatedCountry.name = name;
    }

    if (enName) {
        updatedCountry.enName = enName;
    }
    if (countryCode) {
        updatedCountry.countryCode = countryCode;
    }

    if (geometries) {
        updatedCountry.geometries = geometries;
    }
    // TODO check update all of outeRelation and InRelation
    await country.updateOne({ _id: countryId }, { $set: updatedCountry });

    return get ? country.findOne({ _id: countryId }, get) : { _id: countryId };
};
