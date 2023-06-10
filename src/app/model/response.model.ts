export class ResponseModel<T> {
    data!: T;
    status!: string;
    totalCount!: number;
    errorCode!: string;
    errorMessage!: string;
}