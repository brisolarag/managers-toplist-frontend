export interface ResponseModel<T> {
    success: boolean,
    msg?: string,
    data?: T
}
