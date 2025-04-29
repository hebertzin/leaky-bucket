import { Context, Next } from 'koa';
import { Jwt } from '../../domain/Jwt';
import { Logging } from '../../domain/Logging';
import { HttpStatusCode } from '../../domain/HttpStatus';
import { JwtPayload } from 'jsonwebtoken';

export class AuthenticationMiddleware {
    constructor(
        private readonly jwtService: Jwt,
        private readonly logger: Logging
    ) { }

    async isAuthorized(ctx: Context, next: Next): Promise<void> {
        try {
            if (ctx.path.startsWith("/authentication")) {
                return await next();
            }

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

            this.logger.info(`Payload user request middleware ${ctx}`)
            console.log('ctx.state.user:', ctx.state.user);
            await next();
        } catch (error) {
            this.logger.error('[AuthMiddleware] Unexpected error during token verification');
            ctx.status = HttpStatusCode.InternalServerError;
            ctx.body = { message: 'Internal server error during authentication' };
        }
    }
}
