export interface HttpResponse {
    statusCode: number;
    message?: string;
    data?: any;
}

export interface Controller<T = any> {
    handle(request: T): Promise<HttpResponse>;
}