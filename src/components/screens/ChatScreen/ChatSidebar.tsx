// components
import { 
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"

// icons
import { Search } from "lucide-react"

export function ChatSidebar() {
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
                {Array.from({length: 100}, () =>(
                    <div className="rounded-sm cursor-pointer
                    hover:bg-chart-4/75 active:bg-chart-4 duration-100">
                        <div className="h-12" />
                    </div>
                ))}
            </div>
        </div>
    )
}