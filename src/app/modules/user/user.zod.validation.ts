import { z } from 'zod';

const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  country: z.string(),
});
const orderSchema = z.object({
  productName: z.string(),
  price: z.number(),
  quantity: z.number(),
});

const userValidationSchema = z.object({
  userId: z.number(),
  username: z.string().max(20),
  password: z.string().max(20),
  age: z.number(),
  FullName: z.object({
    firstName: z.string().max(20, {
      message: 'first name can not be more than 20 characters',
    }),
    lastName: z.string().max(20, {
      message: 'last name can not be more than 20 characters',
    }),
  }),
  email: z.string().email({ message: 'Invalid email format' }),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: addressSchema,
  orders: z.array(orderSchema),
});

export default userValidationSchema;
