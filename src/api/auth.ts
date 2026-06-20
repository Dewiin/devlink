import { api, VITE_API_URL } from "./client";

// types
import type { User } from "@/components/types/User";
import type { Sonner } from "@/components/types/Sonner";
import type { Dispatch, SetStateAction } from "react";

type GetCurrentUserResponse = {
    user: User
}

type AuthResponse = {
    message: string,
    accessToken: string,
    user: User
}

export async function getCurrentUser(): Promise<GetCurrentUserResponse> {
    return await api('/api/auth/me', {
        method: "GET",
    });
}

export async function signup(
    data: {
        displayName: string, 
        email: string,
        password: string
    },
    setSonner: Dispatch<SetStateAction<Sonner>>
): Promise<AuthResponse> {
    return await api('/api/auth/signup', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"},
    }, setSonner);
}

export async function login(
    data: {
        email: string,
        password: string
    },
    setSonner: Dispatch<SetStateAction<Sonner>>
): Promise<AuthResponse> {
    return await api('/api/auth/login', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"},
    }, setSonner);
}

export async function oauthLogin(provider: string) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(
                window.location.href=`${VITE_API_URL}/api/auth/${provider}`
            );
        }, 1000);
    })
}

export async function logout(
    setSonner: Dispatch<SetStateAction<Sonner>>
) {
    return await api('/api/auth/logout', {
        method: "GET",
    }, setSonner);
}