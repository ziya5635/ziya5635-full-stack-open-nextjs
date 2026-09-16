export class ActionError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ActionError";
    }
}

export class DomainError extends Error {
    constructor(message: string) {
        super(message);
        this.name = new.target.name;
    }
}

export class UnauthenticatedError extends DomainError {
    constructor(message = "Not logged in") {
        super(message);
    }
}