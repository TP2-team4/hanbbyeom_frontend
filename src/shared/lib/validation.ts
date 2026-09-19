const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const EMAIL_MAX_LENGTH = 255;
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 64;
export const NICKNAME_MIN_LENGTH = 2;
export const NICKNAME_MAX_LENGTH = 16;
export const PASSWORD_MAX_BYTES = 72;

function utf8byteLength(value : string){
    return new TextEncoder().encode(value).length;
}

export function isValidEmail(email: string) {
    return EMAIL_REGEX.test(email) && email.length <= EMAIL_MAX_LENGTH;
}

export function isValidPassword(password: string) {
    return (
        password.length >= PASSWORD_MIN_LENGTH &&
        password.length <= PASSWORD_MAX_LENGTH &&
            utf8byteLength(password) <= PASSWORD_MAX_BYTES
    );
}

export function isPasswordTooManyBytes(password: string) {
    return utf8byteLength(password) > PASSWORD_MAX_BYTES;
}

export function isValidNickname(nickname: string) {
    const trimmed = nickname.trim();
    return (
        trimmed.length >= NICKNAME_MIN_LENGTH &&
        trimmed.length <= NICKNAME_MAX_LENGTH
    );
}
