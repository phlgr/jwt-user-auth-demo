import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cookieParser from 'cookie-parser';
import { connectDatabase } from './lib/database';
import user from './lib/routes/user';
import items from './lib/routes/items';

const app = express();
const port = process.env.PORT || 3001;

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI is not set');
}

app.use(express.json());
app.use(cookieParser());

app.use('/api', user);
app.use('/api', items);

app.get('/api/hello', (_request, response) => {
  response.json({ message: 'Hello API!' });
});

app.use('/storybook', express.static('dist/storybook'));

app.use(express.static('dist/app'));

app.get('*', (_request, response) => {
  response.sendFile('index.html', { root: 'dist/app' });
});

connectDatabase(process.env.MONGODB_URI).then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}!`);
  });
});
