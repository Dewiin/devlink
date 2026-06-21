import { useState, useEffect } from "react";

// api
import { getUserConversations } from "@/api/chat";

// components
import { 
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import { 
    Avatar,
    AvatarFallback 
} from "@/components/ui/avatar";

// icons
import { Search } from "lucide-react"

// types
import type { User } from "@/components/types/User";

export function ChatSidebar() {
    const [ conversations, setConversations ] = useState<User[]>([]);
    
    useEffect(() => {
        async function getConversations() {
            const result = await getUserConversations();
            if(result.length > 0) setConversations(result);
        }

        getConversations();
    }, []);

    return (
        <div 
        className="w-xs 
        bg-accent rounded-sm m-2 p-4
        flex flex-col gap-4"
        >   
            <p className="text-2xl font-bold">Chats</p>

            <InputGroup>
                <InputGroupInput 
                placeholder="Search for a chat"
                />
                <InputGroupAddon>
                    <Search />
                </InputGroupAddon>
            </InputGroup>

            <div className="flex flex-col gap-1 overflow-auto">
                {conversations.map((conversation) => (
                    <div
                    key={conversation.id}
                    className="flex gap-2 items-center 
                    text-sm font-medium
                    rounded-sm cursor-pointer py-2 px-4 
                    hover:bg-chart-4/75 active:bg-chart-4 duration-100"
                    >
                        <Avatar>
                            <AvatarFallback>
                                {conversation.displayName.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <p>{conversation.displayName}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}