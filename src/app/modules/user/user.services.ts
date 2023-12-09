import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDb = async (userData: TUser) => {
  const result = User.create(userData);

  return result;
};
const getAllUser = async () => {
  const result = await User.find();

  return result;
};
const DeleteSingleUser = async (id: string) => {
  const result = await User.deleteOne({ userId: id });

  return result;
};
const searchUser = async (id: string) => {
  const result = await User.findOne({ userId: id });

  return result;
};
const updateUser = async (userData: TUser, id: string) => {
  const result = await User.findOneAndUpdate(
    { userId: id },
    {
      password: userData.password,
      FullName: {
        $set: {
          firstName: userData.FullName.firstName,
          lastName: userData.FullName.lastName,
        },
      },
      age: userData.age,
      email: userData.email,
      isActive: userData.isActive,

      $push: { hobbies: userData.hobbies },

      $set: {
        street: userData.address.street,
        city: userData.address.city,
        country: userData.address.country,
      },

      // orders: {
      //   $set: {
      //     productName: userData.orders.productName,
      //     price: userData.orders.price,
      //     quantity: userData.orders.quantity,
      //   },
      // },
    }
  );

  return result;
};

const getAllUserOrders = async (id: string) => {
  const result = await User.find({ userId: id });

  const allOrders = {
    productName: result[0].orders.productName,
    price: result[0].orders.price,
    quantity: result[0].orders.quantity,
  };

  return allOrders;
};
const userOrderCalculation = async (id: string) => {
  const result = await User.find({ userId: id });

  const totalPrice = result[0].orders.price * result[0].orders.quantity;
  return totalPrice;
};

export const userServices = {
  createUserIntoDb,
  getAllUser,
  DeleteSingleUser,
  searchUser,
  updateUser,
  userOrderCalculation,
  getAllUserOrders,
};
