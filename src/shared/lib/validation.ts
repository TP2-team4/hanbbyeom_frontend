const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const EMAIL_MAX_LENGTH = 255;
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 64;
export const NICKNAME_MIN_LENGTH = 2;
export const NICKNAME_MAX_LENGTH = 16;

export function isValidEmail(email: string) {
    return EMAIL_REGEX.test(email) && email.length <= EMAIL_MAX_LENGTH;
}

export function isValidPassword(password: string) {
    return (
        password.length >= PASSWORD_MIN_LENGTH &&
        password.length <= PASSWORD_MAX_LENGTH
    );
}

export function isValidNickname(nickname: string) {
    const trimmed = nickname.trim();
    return (
        trimmed.length >= NICKNAME_MIN_LENGTH &&
        trimmed.length <= NICKNAME_MAX_LENGTH
    );
}
