import type { User } from "./User"

export type Message = {
    id: string,
    content: string,
    createdAt: Date,
    sender: User,
    conversationId: string,
}