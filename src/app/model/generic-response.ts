export class GenericResponse<T> {
    content: T[];
    data: T;
    message: string;
    status: number;
    totalElements: number;
}