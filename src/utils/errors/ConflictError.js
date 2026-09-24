import { AppError } from "./ApiError.js";

export class ConflictError extends AppError {
    constructor(message = "Entrega duplicada.") {
        super(message, 409);
    }
}