import { REGISTER_URL } from "../common";

export type Request = {
    username: string;
    email: string;
    password: string;
};

export const url = () => `${REGISTER_URL}`;