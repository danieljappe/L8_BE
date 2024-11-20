import 'express';

declare module 'express' {
    export interface Request {
        user?: any; // You can replace `any` with a specific type for your decoded JWT
    }
}
