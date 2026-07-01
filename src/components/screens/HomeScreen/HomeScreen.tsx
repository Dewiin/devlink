// components
import { HomeSidebar } from "./HomeSidebar"
import { HomeContent } from "./HomeContent"

// context
import { useUI } from "@/components/contexts/UIContext"

export function HomeScreen() {
    const { isMobile } = useUI();
    
    return (
        <div className="flex h-full flex-1 min-h-0">
            {!isMobile && <HomeSidebar />}
            <HomeContent />
        </div>
    )
}