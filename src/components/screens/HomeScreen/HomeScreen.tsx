// components
import { HomeSidebar } from "./HomeSidebar"
import { HomeContent } from "./HomeContent"

export function HomeScreen() {
    return (
        <div className="w-full h-full flex">
            <HomeSidebar />
            <HomeContent />
        </div>
    )
}