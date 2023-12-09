import express, { Application } from 'express';
import cors from 'cors';
import { userRoute } from './app/modules/user/user.route';
const app: Application = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', userRoute);

export default app;
