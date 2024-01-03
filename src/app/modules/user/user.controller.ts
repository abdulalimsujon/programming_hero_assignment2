import { Request, Response } from 'express';
import { userServices } from './user.services';
import userValidationSchema from './user.zod.validation';
import { ZodError } from 'zod';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    const value = userValidationSchema.parse(user);

    const result = await userServices.createUserIntoDb(value);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ 'Validation failed:': error.errors });
    } else {
      throw error;
    }
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
      data: result || null,
    });
  } catch (error) {
    console.log(error);
  }
};

///---------------------delete--------------------------------->

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const result = await userServices.DeleteSingleUser(id);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
    });
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

//---------------------------all user order------------------------->
const UserOrders = async (req: Request, res: Response) => {
  const id = req.params.userId;

  await userServices.UserOrders(id);

  res.status(200).json({
    success: true,
    message: 'Order created successfully!',
    data: null,
  });
};

//----------------------update user------------------------------------>

const updateUser = async (req: Request, res: Response) => {
  const id = req.params.userId;
  const reqbody = req.body;

  const result = await userServices.updateUser(reqbody, id);
  console.log(result);

  res.status(200).json({
    success: true,
    message: 'user updated successfully!',
    data: result,
  });
};

//---------------------add order------------------------------>

const addOrder = async (req: Request, res: Response) => {
  const id = req.params.userId;

  const reqbody = req.body;

  await userServices.AddIntoOrder(reqbody, id);

  res.status(200).json({
    success: true,
    message: 'order created  successfully!',
    data: null,
  });
};

export const userController = {
  createUser,
  getAllUser,
  searchUser,
  deleteSingleUser,
  userOrderTotalPrice,
  UserOrders,
  updateUser,
  addOrder,
};
