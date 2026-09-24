import { AppError } from "./ApiError.js";

export class UnprocessableEntityError extends AppError {
    constructor(message = "Entidade não processável.") {
        super(message, 422);
    }
}