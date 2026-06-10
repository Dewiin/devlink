// components
import { ChatSidebar } from "./ChatSidebar"
import { ChatContent } from "./ChatContent"

export function ChatScreen() {
    return (
        <div className="w-full h-full flex">
            <ChatSidebar />
            <ChatContent />
        </div>
    )
}