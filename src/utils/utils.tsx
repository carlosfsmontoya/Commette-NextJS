export function SignUpFormValidator(
    email: string,
    password: string,
    confirmPassword: string,
    name: string,
    lastname: string
){

    const warnings = [];

    if (email.length === 0) {
        warnings.push('Email is required');
    }

    if (password.length === 0) {
        warnings.push('Password is required');
    }

    if (name.length === 0) {
        warnings.push('Name is required');
    }

    if (lastname.length === 0) {
        warnings.push('Lastname is required');
    }

    if (password !== confirmPassword) {
        warnings.push('Passwords do not match');
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        warnings.push('Invalid email format');
    }

    if (password.length < 6) {
        warnings.push('Password must be at least 6 characters');
    }

    if (!/[A-Z]/.test(password)) {
        warnings.push('Password must contain at least one uppercase letter');
    }

    if (!/[\W_]/.test(password)) {
        warnings.push('Password must contain at least one special character');
    }

    if (/(012|123|234|345|456|567|678|789|890)/.test(password)) {
        warnings.push('Password cannot contain sequences of three consecutive numbers');
    }

    return warnings;
}

export function LoginFormValidator(
    email: string,
    password: string
){

    const warnings = [];

    if (email.length === 0) {
        warnings.push('Email is required');
    }

    if (password.length === 0) {
        warnings.push('Password is required');
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
        warnings.push('Invalid email format');
    }

    if (password.length < 6) {
        warnings.push('Password must be at least 6 characters');
    }

    if (!/[A-Z]/.test(password)) {
        warnings.push('Password must contain at least one uppercase letter');
    }

    if (!/[\W_]/.test(password)) {
        warnings.push('Password must contain at least one special character');
    }

    if (/(012|123|234|345|456|567|678|789|890)/.test(password)) {
        warnings.push('Password cannot contain sequences of three consecutive numbers');
    }

    return warnings;
}