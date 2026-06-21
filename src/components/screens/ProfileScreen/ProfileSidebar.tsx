import { useNavigate } from "react-router"

// icons
import { ChevronLeft } from "lucide-react"

export function ProfileSidebar() {
    const navigate = useNavigate();

    return (
        <div className="w-xs 
        bg-accent rounded-sm m-2 p-4">
            <div 
            className="flex gap-2 items-center cursor-pointer w-fit"
            onClick={() => navigate(-1)}
            >
                <ChevronLeft />
                <p className="font-medium text-sm"> Return </p>
            </div>
        </div>
    )
}