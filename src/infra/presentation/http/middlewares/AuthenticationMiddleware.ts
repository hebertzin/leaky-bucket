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
        const authHeader = ctx.headers['authorization'];
        const token = authHeader?.split(' ')[1];

        if (!token) {
            this.logger.warn('[AuthMiddleware] Missing token in Authorization header');
            ctx.status = HttpStatusCode.Unauthorized;
            ctx.body = { message: 'Authentication token is required' };
            return;
        }

        try {
            const payload = this.jwtService.verify(token);
            this.logger.info(`[AuthMiddleware] Payload: ${JSON.stringify(payload)}`);
            if (!payload) {
                this.logger.warn('[AuthMiddleware] Token payload is malformed or missing userId');
                ctx.status = HttpStatusCode.Unauthorized;
                ctx.body = { message: 'Invalid token payload' };
                return;
            }

            ctx.state.user = payload;
            await next();
        } catch (error) {
            this.logger.warn(`[AuthMiddleware] Invalid or expired token: ${error}`);
            ctx.status = HttpStatusCode.Unauthorized;
            ctx.body = { message: 'Invalid or expired authentication token' };
        }
    }
}
