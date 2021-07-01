interface IUser {
  firstName: string;
  lastName: string;
  gender: 1 | 2;
  address: Address;
}

interface Address {
  city: City;
  street: string;
  zipCode: string;
}

interface City {
  name: string;
  state: string;
}

type Return<S, P> = P;

export const ff = <SCHEMA, P>(projection: P): Return<SCHEMA, P> => {};

//usage
const _res = ff<IUser>({
  firstName: 1,
});
