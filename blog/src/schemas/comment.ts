export const content = `
import { db } from "../../config/index.ts";

export enum CommentStatus {
  ACCEPT,
  PENDING,
  REJECT,
}

export interface Comment {
  commenter: string;
  commentStatus: CommentStatus;
  content: string;
  post: string;
}

export const comments = db.collection<Comment>("Comments");
`;

export const createCommentSchema = async (init: string) => {
  await Deno.writeTextFile(`${init}/comment.ts`, content);
};
