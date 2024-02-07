import { User } from './user';
import * as dotenv from 'dotenv';

dotenv.config();
const isDev = process.env.NODE_ENV === 'development';

const dbInit = () => {
  User.sync({ alter: isDev });
};
export default dbInit;
