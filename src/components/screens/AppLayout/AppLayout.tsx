import { Outlet } from "react-router"

// components
import { Sidebar } from "./Sidebar"
import { MobileSidebar } from "./MobileSidebar"

// contexts
import { useUI } from "@/components/contexts/UIContext"

export function AppLayout() {
    const { isMobile } = useUI();

    return (
        <div className={`w-full h-screen flex ${isMobile ? "flex-col" : "flex-row"}`}>
            {!isMobile && <Sidebar />}

            <Outlet />

            {isMobile && <MobileSidebar />}
        </div>
    )
}