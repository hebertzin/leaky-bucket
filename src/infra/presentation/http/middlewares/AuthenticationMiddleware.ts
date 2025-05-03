import { Context, Next } from 'koa';
import { Jwt } from '../../../../domain/Jwt';
import { Logging } from '../../../../domain/Logging';
import { HttpStatusCode } from '../../../../domain/HttpStatus';

export class AuthenticationMiddleware {
    constructor(
        private readonly jwtService: Jwt,
        private readonly logger: Logging
    ) { }

    public async isAuthorized(ctx: Context, next: Next): Promise<void> {
        try {
            const authHeader = ctx.headers['authorization'];
            const token = authHeader?.split(' ')[1];
            if (!token) {
                this.logger.warn('[AuthMiddleware] Missing token in Authorization header');
                ctx.status = HttpStatusCode.Unauthorized;
                ctx.body = { message: 'Authentication token is required' };
                return;
            }

            const payload = this.jwtService.verify(token);
            if (!payload) {
                this.logger.warn('[AuthMiddleware] Invalid or expired token');
                ctx.status = HttpStatusCode.Unauthorized;
                ctx.body = { message: 'Invalid or expired authentication token' };
                return;
            }
            ctx.state.user = payload;
            await next();
        } catch (error) {
            this.logger.error('[AuthMiddleware] Unexpected error during token verification');
            ctx.status = HttpStatusCode.InternalServerError;
            ctx.body = { message: 'Internal server error during authentication' };
        }
    }
}
