class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}


class Validator {
    static validateUsername(username) {
        const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
        if (!usernameRegex.test(username)) {
            throw new ValidationError("Username must be 3-20 alphanumeric characters.");
        }
    }

    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new ValidationError("Please enter a valid email address.");
        }
    }

    static validatePassword(password) {
        const passwordRegex = /^.{8,}$/;
        if (!passwordRegex.test(password)) {
            throw new ValidationError("Password must be 8+ characters.");
        }
    }

    static validatePasswordConfirmation(password, confirmPassword) {
        if (password !== confirmPassword) {
            throw new ValidationError("Passwords do not match.");
        }
    }

}

export { ValidationError, Validator };