// components
import { ChatSidebar } from "./ChatSidebar"
import { ChatContent } from "./ChatContent"

export function ChatScreen() {
    return (
        <div className="w-full flex-1 flex">
            <ChatSidebar />
            <ChatContent />
        </div>
    )
}