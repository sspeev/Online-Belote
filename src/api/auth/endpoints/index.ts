import * as RegisterResource from './register';
import * as LoginResource from './login';
import type { AuthResponse } from '../common';
import { apiClient } from '@/api/axios';

export const register = async (reqBody: RegisterResource.Request) =>
    await apiClient.post<AuthResponse>(RegisterResource.url(), reqBody);

export const login = async (reqBody: LoginResource.Request) =>
    await apiClient.post<AuthResponse>(LoginResource.url(), reqBody);
