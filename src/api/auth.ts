import { api } from "./client";

// types
import type { Dispatch, SetStateAction } from "react";
import type { User } from "@/components/types/User";

export async function getCurrentUser(
    token: string,
    setUser: Dispatch<SetStateAction<User|undefined>>
) {
    const result = await api('/api/auth/me', {
        method: "GET",
    }, token);

    if(result) setUser(result.user)
}

export async function login() {

}