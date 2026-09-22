import { AppError } from "./ApiError.js";

export class ValidationError extends AppError {
    constructor(message){
        super(message, 400);
    }
}