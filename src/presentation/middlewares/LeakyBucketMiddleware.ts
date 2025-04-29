import { Context, Next } from 'koa';
import { Logging } from '../../domain/Logging';

import { HttpStatusCode } from '../../domain/HttpStatus';
import { LeakyBucketUseCase } from '../../application/usecases/leaky-bucket/LeakBucketUseCase';

export class LeakyBucketMiddleware {
    constructor(
        private readonly leakyBucketService: LeakyBucketUseCase,
        private readonly logger: Logging
    ) {}

    async handle(ctx: Context, next: Next): Promise<void> {
        try {
            const user = ctx.state.user;
            if (!user || !user._id) {
                this.logger.warn('[LeakyBucket] User not found in context');
                ctx.status = HttpStatusCode.Unauthorized;
                ctx.body = { message: 'User not authorized' };
                return;
            }

            const allowed = await this.leakyBucketService.execute(user._id);

            if (!allowed) {
                this.logger.warn(`[LeakyBucket] Rate limit exceeded for user ${user.id}`);
                ctx.status = HttpStatusCode.TooManyRequests;
                ctx.body = { message: 'Too many requests. Please try again later.' };
                return;
            }

            await next();
        } catch (error) {
            this.logger.error('[LeakyBucket] Unexpected error during rate limit check');
            ctx.status = HttpStatusCode.InternalServerError;
            ctx.body = { message: 'Internal server error during rate limiting' };
        }
    }
}
