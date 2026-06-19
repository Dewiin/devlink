import type { Sonner } from "@/components/types/Sonner";
import type { Dispatch, SetStateAction } from "react";

export const VITE_API_URL = import.meta.env.VITE_API_URL;

export async function api(
    path: string,
    options: RequestInit = {},
    setSonner?: Dispatch<SetStateAction<Sonner>>,
) { 
    let response = await fetch(`${VITE_API_URL}${path}`, {
        ...options,
        credentials: "include"
    });

    if(response.status === 401) {
        const refreshResponse = await fetch(`${VITE_API_URL}/api/auth/refresh`, {
            method: "GET",
            credentials: "include"
        });

        if (!refreshResponse.ok) {
            setSonner && setSonner({type: "warning", title: "Refresh failed"});
            return;
        }

        response = await fetch(`${VITE_API_URL}${path}`, {
            ...options,
            credentials: "include"
        });
    }

    let result = await response.json();
    if(!response.ok) {
        setSonner && setSonner({
            type: "error",
            title: result.error,
        });
        result = null;
    } else {
        setSonner && setSonner({
            type: "success",
            title: result.message
        });
    }

    return result;
}