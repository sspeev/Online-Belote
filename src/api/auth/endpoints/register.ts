import { REGISTER_URL } from "../common";

export type Request = {
    username: string;
    password: string;
};

export const url = () => `auth/${REGISTER_URL}`;