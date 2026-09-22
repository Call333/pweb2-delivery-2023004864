import { AppError } from "./ApiError";

export class ValidationError extends AppError {
    constructor(message){
        super(message, 400);
    }
}