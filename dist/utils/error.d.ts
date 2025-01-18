export declare class CLIError extends Error {
    code?: string | undefined;
    constructor(message: string, code?: string | undefined);
}
export declare function handleError(error: unknown): never;
