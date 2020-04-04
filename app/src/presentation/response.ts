interface ErrorBody {
    code?: number;
    message: string;
    errors?: [any];
}
interface Headers {
    'Access-Control-Allow-Origin': string;
    'Content-Type': string;
}

enum StatusCode {
    Ok = 200,
    Created = 201,
    NoContent = 204,
    Conflict = 409,
    NotFound = 404,
    BadRequest = 400,
    InternalServerError = 500,
}

export class Response {
    public static ok(body: any) {
        const response = new this({ statusCode: StatusCode.Ok, body });
        return response;
    }

    public static created(body: any) {
        const response = new this({ statusCode: StatusCode.Created, body });
        return response;
    }

    public static deleted() {
        const response = new this({ statusCode: StatusCode.NoContent });
        return response;
    }

    public static patchUpdated(body: any) {
        const response = new this({ statusCode: StatusCode.Ok, body });
        return response;
    }

    public static putUpdated() {
        const response = new this({ statusCode: StatusCode.NoContent });
        return response;
    }

    public static serverError(err?: any) {
        const body: ErrorBody = {
            message: 'Internal server error',
            // TODO : errをそのまま出せないので、handringする必要がある。
            // errors: err,
        };
        const response = new this({
            body,
        });
        return response;
    }

    public statusCode: number;
    public headers: Headers;
    public body?: string;

    constructor(params: {
        statusCode?: number,
        headers?: Headers,
        body?: any,
    }) {
        this.statusCode = params.statusCode ? params.statusCode : StatusCode.InternalServerError;
        this.headers = {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
        };
        this.body = params.body ? JSON.stringify(params.body) : undefined;
    }
}
