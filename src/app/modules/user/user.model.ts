import { Schema, model } from 'mongoose';
import { TAddress, TOrders, TUser, userModel } from './user.interface';
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

const userSchema = new Schema<TUser, userModel>({
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

//creating a instance method

// userSchema.methods.isUserExist = async function (id: number | null) {
//   const existUser = await User.findOne({ userId: id });

//   return existUser;
// };

//create a static mrthod

userSchema.statics.isNotUserExist = async function (id: number) {
  const existUser = await User.findOne({ userId: id });

  if (!existUser) {
    return true;
  }
};

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  user.password = await bcrypt.hash(user.password, 10);

  next();
});

export const User = model<TUser, userModel>('User', userSchema);
