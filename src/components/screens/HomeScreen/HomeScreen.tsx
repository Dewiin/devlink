import { useSearchParams } from "react-router";

// components
import { HomeSidebar } from "./HomeSidebar"
import { HomeContent } from "./HomeContent"

// context
import { useUI } from "@/components/contexts/UIContext"

export function HomeScreen() {
    const [ searchParams ] = useSearchParams();
    const { isMobile } = useUI();

    const showSidebar = searchParams.get("view") === "search";
    
    return (
        <div className="flex h-full flex-1 min-h-0">
            {(showSidebar || !isMobile) && <HomeSidebar />}
            {!showSidebar && <HomeContent />}
        </div>
    )
}