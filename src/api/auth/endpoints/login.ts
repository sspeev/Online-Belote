import { LOGIN_URL } from "../common";

export type Request = {
    email: string;
    password: string;
};

export const url = () => `${LOGIN_URL}`;