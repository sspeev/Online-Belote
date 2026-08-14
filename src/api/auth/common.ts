
export const REGISTER_URL = "auth/register";
export const LOGIN_URL = "auth/login";
export const GUEST_URL = "auth/guest";

export type AuthResponse = {
    resInfo: string;
    token: string;
    expiry: string;
};
