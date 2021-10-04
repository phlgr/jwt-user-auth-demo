import { Router } from 'express';
import { addItem, getItems } from '../models/items';

const router = Router();

router.post('/items', async (req, res) => {
  const userId = req.cookies.userId;
  const item = req.body;
  await addItem(item, userId);
  res.send();
});

router.get('/items/me', async (req, res) => {
  const userId = req.cookies.userId;
  const items = await getItems(userId);
  res.send(items);
});

export default router;
