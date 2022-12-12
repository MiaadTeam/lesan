// export type Iterate = Record<string, number | {[key: string]: number | Iterate}>
export type Iterate = Record<string, number | any>;

export const decreaseIterate = <T extends Iterate>(depth: T) => {
  for (const key in depth) {
    // comments recursive becuase of decrease just first level and proccess every level on its fns
    // typeof depth[key] === "number" ? depth[key]-- : decreaseIterate(depth[key]);

    (typeof depth[key] === "number") && depth[key]--;
  }
  return depth;
};

type CheckRelation = (depth: Iterate, relation: string) => boolean;
export const checkRelation: CheckRelation = (depth, relation) =>
  depth && (typeof depth[relation] === "object" || depth[relation] > -1);
