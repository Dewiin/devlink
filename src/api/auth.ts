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

type SignupResponse = {
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
): Promise<SignupResponse> {
    return await api('/api/auth/signup', {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"},
        credentials: "include"
    }, undefined, setSonner);
}

export async function login() {

}