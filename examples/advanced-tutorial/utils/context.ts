import {
  type Infer,
  type LesanContenxt,
  object,
  type ObjectId,
} from "lesan";
import type { user_pure } from "../models/user.ts";

type Merge<A, B> =
  & {
    [K in keyof A]: K extends keyof B ? B[K] : A[K];
  }
  & B extends infer O ? { [K in keyof O]: O[K] }
  : never;

type UserPureStruct = ReturnType<typeof object<typeof user_pure>>;
type UserPure = Infer<UserPureStruct>;

export interface MyContext extends LesanContenxt {
  user: Merge<
    {
      _id: ObjectId;
    },
    Partial<UserPure>
  >;
}
