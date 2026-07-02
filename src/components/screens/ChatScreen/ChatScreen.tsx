import { useState, useEffect } from "react"
import { useParams } from "react-router"

// components
import { ChatSidebar } from "./ChatSidebar"
import { ChatContent } from "./ChatContent"

// contexts
import { useUI } from "@/components/contexts/UIContext"

export function ChatScreen() {
    const [ showSidebar, setShowSidebar ] = useState<boolean>(false);
    const { recipientId } = useParams();
    const { isMobile } = useUI();

    useEffect(() => {
        if (!recipientId && isMobile) {
            setShowSidebar(true);
        } else {
            setShowSidebar(false);
        }
    }, [recipientId, isMobile]);

    return (
        <div className="flex h-full flex-1 min-h-0">
            {(showSidebar || !isMobile) && <ChatSidebar />}
            {!showSidebar && <ChatContent />}
        </div>
    )
}