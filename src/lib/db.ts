import { Client, type Transaction } from '@planetscale/database';

// Planetscale DB
const client = new Client({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

export const dbQuery = async (query: string) => {
  return client.connection().execute(query);
};
export const transaction = async (
  fn: (tx: Transaction) => Promise<unknown>
) => {
  return client.transaction(fn);
};

// swr
export const fetcher = (str: string) => fetch(str).then((res) => res.json());
