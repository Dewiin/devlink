import { api } from "./client";

// types
import type { User } from "@/components/types/User";
import type { Sonner } from "@/components/types/Sonner";
import type { Dispatch, SetStateAction } from "react";

type GetCurrentUserResponse = {
    user: User
}
export async function getCurrentUser(
    token: string
): Promise<GetCurrentUserResponse> {
    const result = await api('/api/auth/me', {
        method: "GET",
    }, token);

    return result;
}

type AuthResponse = {
    message: string,
    accessToken: string,
    user: User
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
    }, undefined, setSonner);
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
    }, undefined, setSonner);
}

export async function logout(
    setSonner: Dispatch<SetStateAction<Sonner>>
) {
    return await api('/api/auth/logout', {
        method: "GET",
    }, undefined, setSonner);
}