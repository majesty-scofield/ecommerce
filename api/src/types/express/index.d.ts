// to make the file a module and avoid the TypeScript error
export {};

// Extend the Request interface to include the userId property
declare global {
    namespace Express {
        export interface Request {
            userId?: Number;
            cleanBody?: any,
            role?: string,
            user?: any,
        }
    }
}
