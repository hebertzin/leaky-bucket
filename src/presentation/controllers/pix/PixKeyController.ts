import { Request } from "koa";
import { HttpStatusCode } from "../../../domain/HttpStatus";
import { Controller, HttpResponse } from "../../../domain/Controller";
import { AddPixKeyUseCase } from "../../../domain/usecases/PixUseCase";
import { PixKey } from "../../../domain/PixKey";

export class PixKeyContoller implements Controller<Request> {
    constructor(private readonly addPixKeyUseCase: AddPixKeyUseCase) { }

    public async handle({ ctx }: Request): Promise<HttpResponse> {
        try {
            const req = ctx.request.body as PixKey;
            await this.addPixKeyUseCase.execute(req);
            return {
                statusCode: HttpStatusCode.Created,
                message: "Pix key created successfully",
                data: { type: req.type, key: req.key },
            };
        } catch (error: any) {
            return {
                statusCode: error.code,
                message: error.message,
            };
        }
    }
}
