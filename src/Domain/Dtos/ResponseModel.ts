export class ResponseModel<T> {
    isSuccess?: boolean;
    entity?: T;
    data?: Array<T>;
    msg?: string;   
    error?:unknown;
}