import { useParams } from "react-router";

// components
import { ProfileSidebar } from "./ProfileSidebar";
import { ProfileContent } from "./ProfileContent";
import { ProfileEdit } from "./ProfileEdit";
import { ProfilePassword } from "./ProfilePassword";

// contexts
import { useUI } from "@/components/contexts/UIContext";

export function ProfileScreen() {
    const { isMobile } = useUI();
    const { edit } = useParams();

    return (
        <div className="w-full h-full flex">
            {!isMobile && <ProfileSidebar />}
            {!edit && <ProfileContent />}
            {edit === "edit" && <ProfileEdit />}
            {edit === "password" && <ProfilePassword />}
        </div>
    )
}