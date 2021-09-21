import type { Item } from '../../types';
import { getItemsCollection } from '../database';

export async function addItem(
  item: Partial<Item>,
  owner: string
): Promise<void> {
  const itemsCollection = getItemsCollection();
  itemsCollection.insertOne({ ownerId: owner, ...item });
}

export async function getItems(owner: string): Promise<Item[]> {
  const itemsCollection = getItemsCollection();
  return await itemsCollection.find({ ownerId: owner }).toArray();
}
