export class GenericResponse<T> {
    content: T[];
    message: string;
    status: number;
    totalElements: number;
}