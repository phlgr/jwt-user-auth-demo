import type { User } from '../../types';
import { getUserCollection } from '../database';

export async function createUser(user: User): Promise<Partial<User>> {
  const userCollection = getUserCollection();
  const result = await userCollection.insertOne(user);

  return { _id: result.insertedId, username: user.username };
}

export async function findUser(
  user: Partial<User>
): Promise<Partial<User> | null> {
  const userCollection = getUserCollection();
  const result = await userCollection.findOne(user, {
    projection: { password: 0 },
  });
  return result;
}
