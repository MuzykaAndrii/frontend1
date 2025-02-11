export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name;
    }
}

export class Validator {
    static validateUsername(username: string): void {
        const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
        if (!usernameRegex.test(username)) {
            throw new ValidationError("Username must be 3-20 alphanumeric characters.");
        }
    }

    static validateEmail(email: string): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new ValidationError("Please enter a valid email address.");
        }
    }

    static validatePassword(password: string): void {
        const passwordRegex = /^.{8,}$/;
        if (!passwordRegex.test(password)) {
            throw new ValidationError("Password must be 8+ characters.");
        }
    }

    static validatePasswordConfirmation(password: string, confirmPassword: string): void {
        if (password !== confirmPassword) {
            throw new ValidationError("Passwords do not match.");
        }
    }
}