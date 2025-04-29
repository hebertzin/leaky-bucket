export interface HttpResponse {
    statusCode: number;
    message?: string;
    ip?: string;
    data?: any;
}

export interface Controller<T = any> {
    handle(request: T): Promise<HttpResponse>;
}