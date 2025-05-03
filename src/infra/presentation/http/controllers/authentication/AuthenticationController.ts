import { Request } from "koa";
import { Controller, HttpResponse } from "../../../../../domain/Controller";
import { Login } from "../../../../../domain/Authentication";
import { HttpStatusCode } from "../../../../../domain/HttpStatus";

export class AuthenticationController implements Controller<Request> {
    constructor(private readonly authenticationUseCase: Login) { }

    public async handle({ ctx }: Request): Promise<HttpResponse> {
        try {
            const { email, password } = ctx.request.body as { email: string, password: string };
            const { token } = await this.authenticationUseCase.execute({ email, password });
            return {
                code: HttpStatusCode.Ok,
                message: "Authentication successful",
                data: {
                    token: token
                },
            };
        } catch (error: any) {
            return {
                code: error.code,
                message: error.message,
            };
        }
    }
}
