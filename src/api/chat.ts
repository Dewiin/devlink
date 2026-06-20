import { api } from "./client";

// types
import type { Message } from "@/components/types/Message";
import type { GlobalChat } from "@/components/types/GlobalChat";

export async function getGlobalChat(): Promise<GlobalChat> {
    const result = await api(`/api/chat/`, {
        method: "GET",
    });

    return result.globalChat;
}

export async function postGlobalChat(
    data: {
        content: string
    },
): Promise<Message> {
    const result = await api(`/api/chat`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-Type": "application/json"}
    });

    return result.message;
}