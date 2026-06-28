import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

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

// contexts
import { useAuth } from "@/components/contexts/AuthContext";

// icons
import { Search } from "lucide-react"

// types
import type { Conversation } from "@/components/types/Conversation";

export function ChatSidebar() {
    const [ conversations, setConversations ] = useState<Conversation[]>([]);
    const [ filteredConversations, setFilteredConversations ] = useState<Conversation[]>([]);
    const navigate = useNavigate();
    const { user } = useAuth();
    
    useEffect(() => {
        async function getConversations() {
            if(!user) return;

            const result = await getUserConversations();
            if(result) {
                const filteredConversations = result.map((conversation) => ({
                    ...conversation,
                    participants: conversation.participants.filter((participant) => participant.id !== user.id)
                }));
                setConversations(filteredConversations);
                setFilteredConversations(filteredConversations);
            }
        }

        getConversations();
    }, []);

    async function handleSearch(data: string) {
        const filtered = conversations.map((conversation) => ({
            ...conversation,
            participants: conversation.participants.filter((participant) => 
                participant.displayName.toLocaleLowerCase().includes(data.toLocaleLowerCase())
            )
        }));
        setFilteredConversations(filtered);
    }

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
                onChange={(e) => handleSearch(e.target.value)}
                />
                <InputGroupAddon>
                    <Search />
                </InputGroupAddon>
            </InputGroup>

            <div className="flex flex-col gap-1 overflow-auto">
                {filteredConversations.map((conversation) => (
                    conversation.participants.map((participant) => (
                        <div
                        key={participant.id}
                        className="flex gap-2 items-end 
                        text-sm font-medium
                        rounded-sm cursor-pointer py-2 px-4 
                        hover:bg-chart-4/75 active:bg-chart-4 duration-100"
                        onClick={() => navigate(`/chats/${participant.id}`)}
                        >
                            <Avatar>
                                <AvatarFallback>
                                    {participant.displayName.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <p className="text-sm">{participant.displayName}</p>
                                <p className="w-50 text-xs text-muted-foreground truncate">{conversation.messages[0].content}</p>
                            </div>
                        </div>
                    ))
                ))}
            </div>
        </div>
    )
}