import { ecommerceApp } from "../../../../../apps/ecommerce/mod.ts";
import { any, array, InRelation, number, object, optional, OutRelation, string } from "../../../deps.ts";
import {
    contactUsInRel as sharedContactUsInRel,
    contactUsOutRel as sharedContactUsOutRel,
    pureContactUsObj as sharedPureContactUsObj,
} from "../../shared/mod.ts";
import { filePureObj } from "../mod.ts";

// TODO: File
const contactUsPureObj: Partial<typeof sharedContactUsInRel> = {
    _id: optional(any()),
    name: string(),
    email: string(),
    uploadedFiles: array(object(filePureObj)),
    message: string,
};

const contactUsInRel: Partial<typeof sharedContactUsInRel> = {};

const contactUsOutRel: Partial<typeof sharedContactUsOutRel> = {};

export const contactUses = () =>
    ecommerceApp.odm.setModel(
        "contactUs",
        contactUsPureObj,
        contactUsInRel as Record<string, InRelation>,
        contactUsOutRel as Record<string, OutRelation>,
    );
