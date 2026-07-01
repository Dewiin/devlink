import { useEffect, useState } from "react"
import { useParams } from "react-router"

// components
import { ChatSidebar } from "./ChatSidebar"
import { ChatContent } from "./ChatContent"

// contexts
import { useUI } from "@/components/contexts/UIContext"

export function ChatScreen() {
    const [ showSidebar, setShowSidebar ] = useState(false);
    const { recipientId } = useParams();
    const { isMobile } = useUI();

    useEffect(() => {
        if(!recipientId && isMobile) setShowSidebar(true);
        else setShowSidebar(false);
    }, [recipientId]);

    return (
        <div className="w-full flex-1 flex">
            {showSidebar && <ChatSidebar />}
            {!showSidebar && <ChatContent />}
        </div>
    )
}