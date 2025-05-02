import { Request } from "koa";
import { HttpStatusCode } from "../../../domain/HttpStatus";
import { Controller, HttpResponse } from "../../../domain/Controller";
import { AddPixKeyUseCase } from "../../../domain/usecases/PixUseCase";
import { PixKey } from "../../../domain/PixKey";

export class PixKeyContoller implements Controller<Request> {
    constructor(private readonly addPixKeyUseCase: AddPixKeyUseCase) { }

    public async handle({ ctx }: Request): Promise<HttpResponse> {
        try {
            const req = ctx.request.body as Omit<PixKey, "userId">;
            const userId = ctx.state.user._id;
            const owner = ctx.state.user.name;
            const pixKey: PixKey = {
                ...req,
                userId,
                owner
            };

            await this.addPixKeyUseCase.execute(pixKey);
            return {
                code: HttpStatusCode.Created,
                message: "Pix key created successfully",
                data: { type: pixKey.type, key: pixKey.key },
            };
        } catch (error: any) {
            return {
                code: error.code,
                message: error.message,
            };
        }
    }
}
