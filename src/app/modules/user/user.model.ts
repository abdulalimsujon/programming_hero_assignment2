import { Schema, model } from 'mongoose';
import { TUser, UserModel, userMethods } from './user.interface';
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser, UserModel, userMethods>({
  userId: {
    type: String,
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
  age: String,
  email: String,
  isActive: {
    type: Boolean,
    default: false,
  },
  hobbies: [],
  address: {
    street: String,
    city: String,
    country: String,
  },
  orders: {
    productName: String,
    price: Number,
    quantity: Number,
  },
});

userSchema.methods.isUserExist = async function (id: string) {
  const existUser = await User.find({ userId: id });

  return existUser;
};

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  user.password = await bcrypt.hash(user.password, 10);

  next();
});

export const User = model<TUser>('User', userSchema);
