import { Outlet } from "react-router"

// components
import { Sidebar } from "./Sidebar"

export function AppLayout() {
    return (
        <div className="h-full flex overflow-hidden">
            <Sidebar />

            <div className="relative flex-1">
                <Outlet />
            </div>
        </div>
    )
}