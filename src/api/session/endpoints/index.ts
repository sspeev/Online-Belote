
import * as sessionResources from '@/api/session/endpoints/session'
import * as settingSessionResources from '@/api/session/endpoints/setSession'
import { apiClient } from "@/api/axios";


export const isssueCookie = async () => 
    await apiClient.post(sessionResources.url());

export const setCookie = async (playerName : string) => 
    await apiClient.patch(settingSessionResources.url(playerName));

export const clearCookie = async () => 
    await apiClient.delete(sessionResources.url());
