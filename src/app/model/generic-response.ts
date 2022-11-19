export class GenericResponse<T> {
    content: T[];
    error: string;
    message: string;
    status: number;
    totalElements: number;
}