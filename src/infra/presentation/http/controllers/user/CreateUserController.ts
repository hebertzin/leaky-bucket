import { Request } from "koa";
import { HttpStatusCode } from "../../../../../domain/HttpStatus";
import { Controller, HttpResponse } from "../../../../../domain/Controller";
import { User } from "../../../../../domain/entities/Users";
import { CreateUser } from "../../../../../domain/usecases/CreateUserUseCase";

export class CreateUserController implements Controller<Request> {
    constructor(private readonly createUserUseCase: CreateUser) { }

    public async handle({ ctx }: Request): Promise<HttpResponse> {
        try {
            const req = ctx.request.body as User;
            const userCreated = await this.createUserUseCase.execute(req);
            return {
                code: HttpStatusCode.Created,
                message: "User created successfully",
                data: { id: userCreated._id },
            };
        } catch (error: any) {
            return {
                code: error.code,
                message: error.message,
            };
        }
    }
}
