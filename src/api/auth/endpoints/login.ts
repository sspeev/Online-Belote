import { LOGIN_URL } from "../common";

export type Request = {
    username: string;
    password: string;
};

export const url = () => `${LOGIN_URL}`;