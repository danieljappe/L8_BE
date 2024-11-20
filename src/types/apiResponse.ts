import { UserAttributes } from "../models/User";

export type ApiResponse<T> = {
    message: string;
    data?: T;
    error?: string;
};

export type LoginResponse = {
    token: string;
    user: Omit<UserAttributes, 'password'>; // Exclude the password for security
};
