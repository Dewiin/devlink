import { api } from "./client";

// types
import type { User } from "@/components/types/User";

export async function getAllUsers(): Promise<User[]> {
    const result = await api('/api/users', {
        method: "GET"
    });

    return result.users;
}

export async function getProfile(
    userId: string
): Promise<User> {
    const result = await api(`/api/users/${userId}`, {
        method: "GET"
    });

    return result.profile;
}

export async function searchUser(
    data: string,
): Promise<User[]> {
    const result = await api(`/api/users/search?name=${data}`, {
        method: "GET"
    });

    return result.users;
}