import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Lucas Henrique',
    email: 'lucasneri.silva@hotmail.com',
    password_hash: '234125r12ed12de131233e',
  });

  return res.json(user);
});

export default routes;
