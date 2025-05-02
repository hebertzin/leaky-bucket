export interface HttpResponse {
    message?: string;
    data?: any;
    code: number
}

export interface Controller<T = any> {
    handle(request: T): Promise<HttpResponse>;
}