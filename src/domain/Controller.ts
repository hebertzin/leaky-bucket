export interface HttpResponse {
    statusCode: number;
    msg?: string;
    body?: any;
}

export interface Controller<T = any> {
    handle(request: T): Promise<HttpResponse>;
}