import { api } from "./client";

// types
import type { User } from "@/components/types/User";

type getAllUsersResponse = {
    message: string,
    users: User[]
}
export async function getAllUsers(): Promise<getAllUsersResponse> {
    return await api('/api/users', {
        method: "GET"
    });
}