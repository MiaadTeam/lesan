import { Collection, Document, Bson } from "./deps.ts";

/**
 * a function to handle embedded docs
 * @param array : the id of the documents that we are going to handle their embedded fields
 * @param schema : the collection name of the documents
 * @param embeddedField : the field name in the collection that has embedded doc
 * @param document: the pure documents that are going to be keep as embedded
 * @param limit: a number , that specify the number of embedded docs in collection
 * @param headOrTail : a string that can be "head"/"tail"
 * "head":keep the latest doc that is created in embedded
 * "tail":keep the old docs in embedded
 */
export const manEmbedded = async <T>({
	array,
	schema,
	embeddedField,
	document,
	limit,
	headOrTail,
	sortBy,
	sortOrder,
}: {
	array: string[];
	schema: Collection<T>;
	embeddedField: keyof T;
	document: Document[];
	limit: number;
	headOrTail: "head" | "tail";
	sortBy: string;
	sortOrder: "Ascending" | "Descending";
}) => {
	const objIdArray = array.map((x) => new Bson.ObjectId(x));
	let headOrTailToNum;
	headOrTail == "tail" ? (headOrTailToNum = 1) : (headOrTailToNum = -1);
	let asceOrDescNum;
	sortOrder == "Ascending" ? (asceOrDescNum = 1) : (asceOrDescNum = -1);

	await schema.updateMany(
		{ _id: { $in: objIdArray } },
		{
			$push: {
				[embeddedField]: {
					$each: document,
					$slice: limit * headOrTailToNum,
					// TODO:the default value of sort should given, and sortBy should be optional
					$sort: { [sortBy]: asceOrDescNum },
				},
			},
		}
	);
};
