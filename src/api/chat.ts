import { api } from "./client";

// types
import type { Message } from "@/components/types/Message";
import type { Conversation } from "@/components/types/Conversation";
import type { GlobalChat } from "@/components/types/GlobalChat";
import type { User } from "@/components/types/User";

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

export async function getUserConversations(): Promise<User[]> {
    const result = await api('/api/users/chats', {
        method: "GET"
    });

    return result.chats.participants || [];
}

export async function getConversation(
    recipientId: string
): Promise<Conversation> {
    const result = await api(`/api/chat/${recipientId}`, {
        method: "GET"
    });

    return result.conversation;
}