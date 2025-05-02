import { Request } from "koa";
import { HttpStatusCode } from "../../../domain/HttpStatus";
import { Controller, HttpResponse } from "../../../domain/Controller";
import { FindAllByUserId } from "../../../domain/usecases/FindAllByUserIdUseCase";

export class FindAllPixKeyByUserIdContoller implements Controller<Request> {
    constructor(private readonly findAllByUserId: FindAllByUserId) { }

    public async handle({ ctx }: Request): Promise<HttpResponse> {
        try {
            const userId = ctx.state.user._id;
            const allPixkeys = await this.findAllByUserId.execute(userId);
            return {
                code: HttpStatusCode.Ok,
                message: "Pix keys retrieved successfully",
                data: allPixkeys,
            };
        } catch (error: any) {
            return {
                code: error.code,
                message: error.message,
            };
        }
    }
}
