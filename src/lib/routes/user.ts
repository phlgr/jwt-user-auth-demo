import { Router } from 'express';
import { createUser, findUser } from '../models/user';

const router = Router();

router.post('/users', async (req, res) => {
  const user = req.body;
  console.log(user);
  const insertedUser = await createUser(user);
  res.send(insertedUser);
});

router.post('/users/login', async (req, res) => {
  const userQuery = req.body;
  const user = await findUser(userQuery);
  if (!user) {
    res.status(404).send('User not found');
    return;
  }
  if (!user._id) {
    res.status(500).send('Internal Server Error');
    return;
  }
  res.cookie('userId', user._id.toString(), { maxAge: 24 * 60 * 60 * 1000 });
  res.json(user);
});

router.get('/users/me', (req, res) => {
  const userId = req.cookies.userId;
  if (!userId) {
    res.status(401).send('Unauthorized');
    return;
  }
  console.log(userId);
  res.json(userId);
});

export default router;
