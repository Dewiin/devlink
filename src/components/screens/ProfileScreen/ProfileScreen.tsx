// components
import { ProfileSidebar } from "./ProfileSidebar";
import { ProfileContent } from "./ProfileContent";

// contexts
import { useUI } from "@/components/contexts/UIContext";

export function ProfileScreen() {
    const { isMobile } = useUI();

    return (
        <div className="w-full h-full flex">
            {!isMobile && <ProfileSidebar />}
            <ProfileContent />
        </div>
    )
}