import { env } from "../env/Env";

export const dbConfig = {
  uri: env.MONGO_URI,
  dbName: process.env.DATABASE as string,
};
