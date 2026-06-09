// components
import { 
    InputGroup,
    InputGroupTextarea,
    InputGroupAddon 
} from "@/components/ui/input-group"
import { Separator } from "@/components/ui/separator"

export function HomeContent() {

    return (
        <div className="flex-1 flex flex-col gap-4
        bg-accent rounded-sm 
        m-2 ml-0 p-4">
            <p className="text-2xl font-bold">Global Chat</p>
            <Separator/>

            <div className="flex-1 bg-chart-4">

            </div>

            <InputGroup>
                <InputGroupTextarea 
                placeholder="Write a message..." 
                rows={1}
                />
                <InputGroupAddon align="block-end">
                    0/200
                </InputGroupAddon>
            </InputGroup>
        </div>
    )
}