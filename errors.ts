









export class NotFoundResource extends Error {
    status: number;

    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
        this.status = 500;
    }
}


export class ValidationError extends Error {
    status: number;

    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
        this.status = 500;
    }
}
