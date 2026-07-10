import { api } from "./client";
import type { Dispatch, SetStateAction } from "react";

// types
import type { User } from "@/components/types/User";
import type { Sonner } from "@/components/types/Sonner";

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

export async function updateAvatar(
    file: File,
    setSonner: Dispatch<SetStateAction<Sonner>>
) {
    const formData = new FormData();
    formData.append("avatar", file);

    const result = await api('/api/users/me/avatar', {
        method: "PUT",
        body: formData
    }, setSonner);

    return result;
}

export async function updateBanner(
    file: File,
    setSonner: Dispatch<SetStateAction<Sonner>>
) {
    const formData = new FormData();
    formData.append("banner", file);

    const result = await api('/api/users/me/banner', {
        method: "PUT",
        body: formData
    }, setSonner);

    return result;
}

export async function updateProfile(
    data: {
        displayName: string,
        bio: string
    },
    setSonner: Dispatch<SetStateAction<Sonner>>
) {
    const result = await api(`/api/users/me`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
    }, setSonner);

    return result;
}

export async function updatePassword(
    data: {
        oldPassword: string,
        newPassword: string
    },
    setSonner: Dispatch<SetStateAction<Sonner>>
) {
    const result = await api(`/api/users/me/password`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
    }, setSonner);

    return result;  
}