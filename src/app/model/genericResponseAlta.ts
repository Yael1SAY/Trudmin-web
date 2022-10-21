

export class GenericResponseAlta<T> {
    data: T;
    message: string;
    status: number;
    timestamp: string;
    error: string;
    errors: string[];
}