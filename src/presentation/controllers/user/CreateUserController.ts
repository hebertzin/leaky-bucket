import { Request } from "koa";
import { HttpStatusCode } from "../../../domain/HttpStatus";
import { User } from "../../../domain/entities/Users";
import { CreateUser } from "../../../domain/usecases/CreateUserUseCase";
import { Controller, HttpResponse } from "../../../domain/Controller";

export class CreateUserController implements Controller<Request> {
    constructor(private readonly createUserUseCase: CreateUser) { }

    public async handle({ ctx }: Request): Promise<HttpResponse> {
        try {
            const req = ctx.request.body as User;
            await this.createUserUseCase.execute(req);
            return {
                statusCode: HttpStatusCode.Created,
                message: "User created successfully",
                data: { email: req.email, name: req.name },
            };
        } catch (error: any) {
            return {
                statusCode: error.code,
                message: error.message,
            };
        }
    }
}
