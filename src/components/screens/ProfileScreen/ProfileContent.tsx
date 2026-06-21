import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router"

// api
import { getProfile } from "@/api/user";

// components
import { 
    Avatar,
    AvatarFallback 
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";

// contexts
import { useAuth } from "@/components/contexts/AuthContext";

// types 
import type { User } from "@/components/types/User";

export function ProfileContent() {
    const [ profile, setProfile ] = useState<User|undefined>();
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const { user } = useAuth();
    const navigate = useNavigate();
    const { userId } = useParams();

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
        <div className="flex-1 flex flex-col gap-4
        bg-accent rounded-sm 
        m-2 ml-0 p-4">
            {profile && <>
            <img 
            className="w-full outline-1 h-50 rounded-sm object-cover" 
            src="/src/assets/background.jpg"
            />

            <Avatar className="w-20 h-20">
                <AvatarFallback>
                    {profile.displayName.charAt(0)}
                </AvatarFallback>
            </Avatar>

            <div className="flex items-center justify-between px-2">
                <p className="font-medium">{profile.displayName}</p>

                {user && profile.id !== user.id &&
                <Button 
                className="cursor-pointer"
                onClick={() => navigate(`/chats/${profile.id}`)}
                >
                    Send Message
                </Button>
                }
            </div>
            </> }
        </div>
    )
}