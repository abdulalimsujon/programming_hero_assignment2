import { Model } from 'mongoose';

export type TAddress = {
  street: string;
  city: string;
  country: string;
};

export type TOrders = {
  productName: string;
  price: number;
  quantity: number;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  FullName: {
    firstName: string;
    lastName: string;
  };
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders: TOrders[];
};

// export type userMethods = {
//   isUserExist(id: number): Promise<TUser | null>;
// };
//export type UserModel = Model<TUser, Record<string, never>, userMethods>;

export interface userModel extends Model<TUser> {
  isNotUserExist(id: number): Promise<TUser | null>;
}
