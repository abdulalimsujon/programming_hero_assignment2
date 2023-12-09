import express from 'express';
import cors from 'cors';
import { userController } from './user.controller';

const router = express.Router();

router.use(express.json());
router.use(cors());

router.post('/', userController.createUser);
router.get('/', userController.getAllUser);
router.get('/:userId', userController.searchUser);
router.delete('/:userId', userController.deleteSingleUser);
router.get('/:userId/orders/total-price', userController.userOrderTotalPrice);
router.get('/:userId/orders', userController.allUserOrders);
router.put('/:userId', userController.updateUser);

export const userRoute = router;
