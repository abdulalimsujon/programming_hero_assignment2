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
  userId: string;
  username: string;
  password: string;
  FullName: {
    firstName: string;
    lastName: string;
  };
  age: string;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders: TOrders;
};

export type userMethods = {
  isUserExist(id: string): Promise<TUser | null>;
};

export type UserModel = Model<TUser, Record<string, never>, userMethods>;
