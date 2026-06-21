import type { Message } from "./Message"
import type { User } from "./User"

export type Conversation = {
    id: string,
    createdAt: string,
    messages: Message[],
    participants: User[]
}