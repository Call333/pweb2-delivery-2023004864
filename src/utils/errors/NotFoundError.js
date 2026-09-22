import { AppError } from "./ApiError.js";

export class NotFoundError extends AppError {
    constructor(message = "Recurso não encontrado.") {
        super(message, 400);
    }
}