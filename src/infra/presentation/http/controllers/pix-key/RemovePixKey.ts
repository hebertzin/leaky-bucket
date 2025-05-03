import { Request } from "koa";
import { Controller, HttpResponse } from "../../../../../domain/Controller";
import { RemovePixKey } from "../../../../../domain/usecases/RemovePixKeyUseCase";
import { HttpStatusCode } from "../../../../../domain/HttpStatus";

export class RemovePixKeyContoller implements Controller<Request> {
    constructor(private readonly findPixKeyUseCase: RemovePixKey) { }

    public async handle({ ctx }: Request): Promise<HttpResponse> {
        try {
            const { key } = ctx.request.query;
            await this.findPixKeyUseCase.execute(key as string);
            return {
                code: HttpStatusCode.NoContent,
                message: "Pix key removed successfully",
            };
        } catch (error: any) {
            return {
                code: error.code,
                message: error.message,
            };
        }
    }
}
