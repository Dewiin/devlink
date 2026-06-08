// components
import { Separator } from "@/components/ui/separator"

// icons
import { 
    Globe,
    MessageSquare,
    CircleUser, 
    LogOut, 
} from "lucide-react"

export function Sidebar() {

    return (
        <div
            className="p-6 h-full 
            flex flex-col gap-6
            bg-sidebar text-sm font-semibold"
        >
            <div className="w-12 h-12 bg-black rounded-sm m-auto" />

            <Separator />

            <div className="flex flex-col flex-1 gap-2
            *:flex *:gap-2 *:items-center *:p-2 *:pr-16 *:rounded-sm *:cursor-pointer
            *:hover:bg-accent *:active:bg-accent/50 *:duration-100 
            ">
                <div>
                    <Globe />
                    <p>Global</p>
                </div>
                <div>
                    <MessageSquare />
                    <p>Chats</p>
                </div>
            </div>

            <Separator />
            
            <div className="flex flex-col gap-2
            *:flex *:gap-2 *:items-center *:p-2 *:pr-16 *:rounded-sm *:cursor-pointer
            *:hover:bg-accent *:active:bg-accent/50 *:duration-100
            ">
                <div>
                    <CircleUser />
                    <p>Profile</p>
                </div>
                <div>
                    <LogOut />
                    <p>Logout</p>
                </div>
            </div>
        </div>
    )
}