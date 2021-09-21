import type { ObjectId } from 'bson';

export type User = {
  _id?: ObjectId;
  username: string;
  password: string;
};

export type Item = {
  _id?: ObjectId;
  name: string;
  ownerId: string;
};
