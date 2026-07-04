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
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const { isMobile } = useUI();
    const { userId, edit } = useParams();

    useEffect(() => {
        async function fetchProfile() {
            if(!userId) return;
            setIsLoading(true);
            try {
                const result = await getProfile(userId);
                if(result) setProfile(result);
            } finally {
                setIsLoading(false);
            }
        }

        fetchProfile();
    }, [userId]);

    return (
        <div className="w-full h-full flex">
            {!isMobile && <ProfileSidebar />}
            {!edit && <ProfileContent profile={profile} setProfile={setProfile} />}
            {edit === "edit" && <ProfileEdit profile={profile} setProfile={setProfile} />}
            {edit === "password" && <ProfilePassword />}
        </div>
    )
}