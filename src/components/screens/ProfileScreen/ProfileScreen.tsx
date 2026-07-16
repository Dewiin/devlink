import { useEffect, useState } from "react";
import { useParams } from "react-router";

// api
import { getProfile } from "@/api/user";

// components
import { ProfileSidebar } from "./ProfileSidebar";
import { ProfileContent } from "./ProfileContent";
import { ProfileEdit } from "./ProfileEdit";
import { ProfilePassword } from "./ProfilePassword";

// contexts
import { useUI } from "@/components/contexts/UIContext";

// types
import type { User } from "@/components/types/User";

export function ProfileScreen() {
    const [ profile, setProfile ] = useState<User|undefined>();
    const [ profileMode, setProfileMode ] = useState<string>("profile")
    const { userId } = useParams();
    const { isMobile } = useUI();

    useEffect(() => {
        async function fetchProfile() {
            if(!userId) return;

            const result = await getProfile(userId);
            if(result) setProfile(result);
        }

        fetchProfile();
    }, [userId]);

    return (
        <div className="w-full h-full flex select-none">
            {!isMobile && <ProfileSidebar profileMode={profileMode} setProfileMode={setProfileMode} />}
            {profileMode === "profile" && <ProfileContent profile={profile} setProfile={setProfile} />}
            {profileMode === "edit" && <ProfileEdit profile={profile} setProfile={setProfile} />}
            {profileMode === "password" && <ProfilePassword />}
        </div>
    )
}