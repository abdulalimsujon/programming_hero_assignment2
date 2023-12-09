import { Request, Response } from 'express';
import { userServices } from './user.services';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    const result = await userServices.createUserIntoDb(user);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });

    // res.status(400).json({
    //   success: false,
    //   message: 'create user failed!',
    //   data: null,
    // });
  } catch (error) {
    console.log(error);
  }
};
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUser();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });

    // res.status(400).json({
    //   success: false,
    //   message: 'fetch  user failed!',
    //   data: null,
    // });
  } catch (error) {
    console.log(error);
  }
};
const searchUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const result = await userServices.searchUser(id);

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
    // res.status(400).json({
    //   success: false,
    //   message: 'fetch  user failed!',
    //   data: null,
    // });
  } catch (error) {
    console.log(error);
  }
};
const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const result = await userServices.DeleteSingleUser(id);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
    });

    // res.status(400).json({
    //   success: false,
    //   message: 'fetch  user failed!',
    //   data: null,
    // });
  } catch (error) {
    console.log(error);
  }
};

const userOrderTotalPrice = async (req: Request, res: Response) => {
  const id = req.params.userId;

  const result = await userServices.userOrderCalculation(id);
  const userTotalOrderPrice = {
    totalPrice: result,
  };
  res.status(200).json({
    success: true,
    message: 'Total price calculated successfully!',
    data: userTotalOrderPrice,
  });
};
const allUserOrders = async (req: Request, res: Response) => {
  const id = req.params.userId;

  const result = await userServices.getAllUserOrders(id);

  res.status(200).json({
    success: true,
    message: 'Order fetched successfully!',
    data: result,
  });
};
const updateUser = async (req: Request, res: Response) => {
  const id = req.params.userId;
  const reqbody = req.body;

  const result = await userServices.updateUser(reqbody, id);

  res.status(200).json({
    success: true,
    message: 'user updated successfully!',
    data: result,
  });
};

export const userController = {
  createUser,
  getAllUser,
  searchUser,
  deleteSingleUser,
  userOrderTotalPrice,
  allUserOrders,
  updateUser,
};
