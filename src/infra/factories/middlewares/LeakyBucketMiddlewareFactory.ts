import { Context, Next } from "koa";
import { LeakyBucketUseCase } from "../../../application/usecases/leaky-bucket/LeakBucketUseCase";
import { dbConfig } from "../../../config/DbConfig";
import { LeakyBucketMiddleware } from "../../../presentation/middlewares/LeakyBucketMiddleware";
import { MongoDBClient } from "../../database/MongoDBClient";
import { MongoLeakyBucketRepository } from "../../database/repository/LeakBucketRepository";
import { logging } from "../../logging/Logging";

export const leakyBucketMiddlewareFactory = async () => {
    const mongoClient = new MongoDBClient(dbConfig);
    await mongoClient.connect();
    const db = mongoClient.getDatabase();
    const repository = new MongoLeakyBucketRepository(db);

    // Creating an instance of the middleware and returning a function to make it easier to use and more flexible in koa
    const leakyBucketMiddleware = new LeakyBucketMiddleware(new LeakyBucketUseCase(repository), logging);
    return (ctx: Context, next: Next) => leakyBucketMiddleware.handle(ctx, next);
}
