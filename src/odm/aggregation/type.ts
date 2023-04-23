export type Projection = { [key: string]: number | Projection };

export interface Lookup {
  from: string;
  localField: string;
  foreignField: string;
  as: string;
}

export interface Unwind {
  path: string;
  preserveNullAndEmptyArrays: true;
}

export type LookupObj = {
  $lookup: Lookup;
};

export type UnwindObj = {
  $unwind: Unwind;
};

export type ProjectionObj = {
  $project: Projection;
};

export type ProjectionPip = (LookupObj | UnwindObj | ProjectionObj)[];
