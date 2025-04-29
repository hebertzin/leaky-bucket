export const dbConfig = {
    uri: `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.DATABASE}?authSource=admin`,
    dbName: process.env.DATABASE as string,
  };
  