import { AppError } from "./ApiError";

export class NotFoundError extends AppError {
    constructor(message = "Recurso não encontrado.") {
        super(message, 400);
    }
}