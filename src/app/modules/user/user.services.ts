import { TOrders, TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDb = async (userData: TUser) => {
  const user = new User(userData);

  if (await user.isUserExist(userData.userId)) {
    throw new Error('user already exsits');
  }
  user.save();

  const res = {
    userId: user.userId,
    username: user.username,
    FullName: user.FullName,
    age: user.age,
    email: user.email,
    isActive: user.isActive,
    hobbies: user.hobbies,
    address: user.address,
  };

  return res;
};
const getAllUser = async () => {
  const result = await User.find({});

  return result;
};
const DeleteSingleUser = async (id: string) => {
  const result = await User.deleteOne({ userId: id });

  return result;
};
const searchUser = async (id: string) => {
  const user = await User.findOne({ userId: id });
  console.log('search', user);
  const result = {
    userId: user?.userId,
    username: user?.username,
    firstName: user?.FullName?.firstName,
    lastName: user?.FullName?.lastName,
    age: user?.age,
    email: user?.email,
    isActive: user?.isActive,
    hobbies: user?.hobbies,
    address: {
      street: user?.address?.street,
      city: user?.address?.city,
      country: user?.address?.country,
    },
  };

  return result;
};

///------------------update user---------------------------->

const updateUser = async (userData: TUser, id: string) => {
  await User.updateOne(
    { userId: id },

    {
      $set: {
        FullName: userData.FullName,
        age: userData.age,
        email: userData.email,
        isActive: userData.isActive,
        hobbies: userData.hobbies,
        orders: userData.orders,
        address: userData.address,
      },
    }
  );

  const result = await User.findOne({ userId: id }, { password: 0 });

  return result;
};

//-------------------get user order-------------------------------->

const UserOrders = async (id: string) => {
  const result = await User.find({ userId: id });

  return result;
};
const userOrderCalculation = async (id: string): Promise<number> => {
  const result = await User.find({ userId: id });
  let sum = 0;

  const orders = result[0].orders;

  orders?.map((order: TOrders) => {
    const totalPrice = order.price * order.quantity;

    sum = sum + totalPrice;
  });

  return sum;
};

//---------------------------- add order---------------------------------->

const AddIntoOrder = async (orderData: TOrders, id: string) => {
  // const result1= await User.find({ userId: id });
  const result = await User.updateOne(
    { userId: id },
    {
      $push: { orders: orderData },
    }
  );

  return result;
};

export const userServices = {
  createUserIntoDb,
  getAllUser,
  DeleteSingleUser,
  searchUser,
  updateUser,
  userOrderCalculation,
  UserOrders,
  AddIntoOrder,
};
