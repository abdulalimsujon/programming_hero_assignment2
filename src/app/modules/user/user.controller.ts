import { Request, Response } from 'express';
import { userServices } from './user.services';
import userValidationSchema from './user.zod.validation';
import { ZodError } from 'zod';
import { User } from './user.model';

// ------------------create a user----------------------------->

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    const value = userValidationSchema.parse(user);

    await userServices.createUserIntoDb(value);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: value,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      res.status(400).json({
        'Validation failed:': error.errors[0].message,
      });
    } else {
      res.status(400).json({
        success: false,

        error: {
          code: 404,
          message: error.message,
        },
      });
    }
  }
};

//--------------------get all user----------------------------------------->

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUser();

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,

      error: {
        code: 404,
        message: error.message,
      },
    });
  }
};

//------------------------------search a user------------------------------->
const searchUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await userServices.searchUser(parseInt(userId));

    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    console.log(error);

    res.status(400).json({
      success: false,
      message: error.message,
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
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
  } catch (error: any) {
    res.status(400).json({
      success: false,

      error: {
        code: 404,
        message: error.message,
      },
    });
  }
};
///---------------user order total price------------------------------->

const userOrderTotalPrice = async (req: Request, res: Response) => {
  try {
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
  } catch (error: any) {
    res.status(400).json({
      success: false,

      error: {
        code: 404,
        message: error.message,
      },
    });
  }
};

//---------------------------all user order------------------------->
const UserOrders = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;

    const result = await userServices.UserOrders(parseInt(id));

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result[0].orders,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,

      error: {
        code: 404,
        message: error.message,
      },
    });
  }
};

//----------------------update user------------------------------------>

const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;
    const reqbody = req.body;

    const result = await userServices.updateUser(reqbody, parseInt(id));
    console.log(result);

    res.status(200).json({
      success: true,
      message: 'user updated successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,

      error: {
        code: 404,
        message: error.message,
      },
    });
  }
};

//---------------------add order------------------------------>

const addOrder = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId;

    const reqbody = req.body;

    await userServices.AddIntoOrder(reqbody, id);

    res.status(200).json({
      success: true,
      message: 'order created  successfully!',
      data: null,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,

      error: {
        code: 404,
        message: error.message,
      },
    });
  }
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
