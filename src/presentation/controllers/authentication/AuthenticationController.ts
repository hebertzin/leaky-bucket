import { Request } from "koa";
import { HttpStatusCode } from "../../../domain/HttpStatus";
import { Controller, HttpResponse } from "../../../domain/Controller";
import { Login } from "../../../domain/Authentication";

export class AuthenticationController implements Controller<Request> {
    constructor(private readonly authenticationUseCase: Login) { }

    public async handle({ ctx }: Request): Promise<HttpResponse> {
        try {
            const { email, password } = ctx.request.body as { email: string, password: string };
            const { token } = await this.authenticationUseCase.execute({ email, password });
            return {
                statusCode: HttpStatusCode.Ok,
                message: "User log in",
                data: {
                    token: token
                },
            };
        } catch (error: any) {
            return {
                statusCode: error.code,
                message: error.message,
            };
        }
    }
}
