import { Schema, model } from 'mongoose';
import {
  TAddress,
  TOrders,
  TUser,
  UserModel,
  userMethods,
} from './user.interface';
import bcrypt from 'bcrypt';

const orderSchema = new Schema<TOrders>({
  productName: String,
  price: Number,
  quantity: Number,
});
const addressSchema = new Schema<TAddress>({
  street: String,
  city: String,
  country: String,
});

const userSchema = new Schema<TUser, UserModel, userMethods>({
  userId: {
    type: Number,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
  },
  password: String,
  FullName: {
    firstName: String,
    lastName: String,
  },
  age: Number,
  email: String,
  isActive: {
    type: Boolean,
    default: false,
  },
  hobbies: { type: [String], default: [] },
  address: addressSchema,
  orders: { type: [orderSchema], default: [] },
});

userSchema.methods.isUserExist = async function (id: string) {
  const existUser = await User.findOne({ id });

  return existUser;
};

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  user.password = await bcrypt.hash(user.password, 10);

  next();
});

export const User = model<TUser, UserModel>('User', userSchema);
