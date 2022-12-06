export class GenericResponse<T> {
    content: T[];
    data: T[];
    error: string;
    message: string;
    status: number;
    totalElements: number;
}