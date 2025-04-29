import { Request } from "koa";
import { HttpStatusCode } from "../../../domain/HttpStatus";
import { User } from "../../../domain/entities/Users";
import { CreateUser } from "../../../domain/usecases/CreateUserUseCase";
import { Controller, HttpResponse } from "../../../domain/Controller";

export class CreateUserController implements Controller<Request> {
    constructor(private readonly createUserUseCase: CreateUser) { }

    public async handle(req: Request): Promise<HttpResponse> {
        try {
            const user = req.ctx.body as User;
            await this.createUserUseCase.execute(user);

            return {
                statusCode: HttpStatusCode.Created, 
                msg: "User created successfully",
                body: { email: user.email, name: user.name },
            };
        } catch (error: any) {
            return {
                statusCode: error.code || HttpStatusCode.InternalServerError,
                msg: error.message || "Unexpected error",
            };
        }
    }
}
