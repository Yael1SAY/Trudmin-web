export class GenericResponse<T> {
    content: T[];
    data: any;
    message: string;
    status: number;
    totalElements: number;
}