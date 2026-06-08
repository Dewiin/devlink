import { Outlet } from "react-router"

// components
import { Sidebar } from "./Sidebar"

export function AppLayout() {
    return (
        <div className="h-full flex">
            <Sidebar />

            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    )
}