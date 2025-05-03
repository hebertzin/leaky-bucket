import { Context, Next } from 'koa';
import { Logging } from '../../domain/Logging';
import { HttpStatusCode } from '../../domain/HttpStatus';
import { LeakyBucketUseCase } from '../../domain/usecases/LeakBucketUseCase';

export class LeakyBucketMiddleware {
    constructor(
        private readonly leakyBucketService: LeakyBucketUseCase,
        private readonly logger: Logging
    ) { }

    public async handle(ctx: Context, next: Next): Promise<void> {
        try {
            const user = ctx.state.user;
            if (!user || !user._id) {
                this.logger.warn('[LeakyBucket] User not found in context');
                ctx.status = HttpStatusCode.Unauthorized;
                ctx.body = { message: 'User not authorized' };
                return;
            }

            await next();
            // Consider the request successful if HTTP status is below 400
            const success = ctx.status < 400;
            this.logger.info(`[LeakyBucket] status: ${ctx.status}, success: ${success}`);

            // Run leaky bucket logic to decide whether to allow this user to continue making requests
            // If request failed (status >= 400), a token will be consumed
            const allowed = await this.leakyBucketService.execute(user._id, success);
            if (!allowed) {
                this.logger.warn(`[LeakyBucket] Rate limit exceeded for user ${user._id}`);
                ctx.status = HttpStatusCode.TooManyRequests;
                ctx.body = { message: 'Too many requests. Please try again later.' };
            }

        } catch (error) {
            this.logger.error('[LeakyBucket] Unexpected error during rate limit check');
            ctx.status = HttpStatusCode.InternalServerError;
            ctx.body = { message: 'Internal server error during rate limiting' };
        }
    }
}
