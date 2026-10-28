export const REGISTER_URL = "Auth/register";
export const LOGIN_URL = "Auth/login";
export const GUEST_URL = "Auth/guest";

export interface AuthData {
    token: string;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T | null;
    errors: string[];
    message: string | null;
}

export type AuthResponse = ApiResponse<AuthData>;