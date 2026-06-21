// components
import { ProfileSidebar } from "./ProfileSidebar";
import { ProfileContent } from "./ProfileContent";

export function ProfileScreen() {
    return (
        <div className="w-full h-full flex">
            <ProfileSidebar />
            <ProfileContent />
        </div>
    )
}