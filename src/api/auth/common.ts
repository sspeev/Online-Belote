
export const REGISTER_URL = "Auth/register";
export const LOGIN_URL = "Auth/login";
export const GUEST_URL = "Auth/guest";

export type AuthResponse = {
    resInfo: string;
    token: string;
    expiry: string;
};
