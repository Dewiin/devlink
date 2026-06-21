import { useState, useEffect } from "react"

// types
import type { User } from "@/components/types/User"

export function ChatContent() {
    const [ chats, setChats ] = useState<User[]>([]);

    return (
        <div className="flex-1 flex flex-col gap-4
        bg-accent rounded-sm 
        m-2 ml-0 p-4">
            <p className="text-2xl font-bold">Chats</p>
        </div>
    )
}