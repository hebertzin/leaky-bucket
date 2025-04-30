import { Request } from "koa";
import { HttpStatusCode } from "../../../domain/HttpStatus";
import { Controller, HttpResponse } from "../../../domain/Controller";
import { FindPixKey } from "../../../domain/usecases/FindPixKeyUseCase";

export class FindPixKeyContoller implements Controller<Request> {
    constructor(private readonly findPixKeyUseCase: FindPixKey) { }

    public async handle({ ctx }: Request): Promise<HttpResponse> {
        try {
            const { key } = ctx.request.query;
            const req = await this.findPixKeyUseCase.execute(key as string);
            return {
                statusCode: HttpStatusCode.Created,
                message: "Pix key found successfully",
                data: { type: req?.type, key: req?.key },
            };
        } catch (error: any) {
            return {
                statusCode: error.code,
                message: error.message,
            };
        }
    }
}
