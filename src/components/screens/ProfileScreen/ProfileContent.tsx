import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router"

// api
import { getProfile, updateAvatar } from "@/api/user";

// components
import { 
    Avatar,
    AvatarImage,
    AvatarFallback 
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// contexts
import { useAuth } from "@/components/contexts/AuthContext";
import { useUI } from "@/components/contexts/UIContext";

// icons
import { Camera } from "lucide-react";

// types 
import type { User } from "@/components/types/User";

export function ProfileContent() {
    const [ profile, setProfile ] = useState<User|undefined>();
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ hoverPhoto, setHoverPhoto ] = useState<boolean>(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const { user } = useAuth();
    const { setSonner } = useUI();
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

    function handleClick() {
        fileInputRef.current?.click();
    }

    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        toast.promise(async () => {
            const result = await updateAvatar(file, setSonner);
            if(result.avatarUrl) {
                setProfile((prev) => {
                    if(!prev) return prev;

                    return {
                        ...prev,
                        avatarUrl: result.avatarUrl
                    }
                });
            }
        }, {
            loading: "Updating avatar...",
            position: "top-right"
        }
        );
    }

    return (
        <div className="flex-1 flex flex-col gap-4
        bg-accent rounded-sm 
        m-2 p-4">
            {profile && <>
            <img 
            className="w-full outline-1 h-50 rounded-sm object-cover" 
            src="/src/assets/background.jpg"
            />

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />

            <div
            className="relative w-30 h-30 rounded-full overflow-hidden cursor-pointer"
            onMouseEnter={() => setHoverPhoto(true)}
            onMouseLeave={() => setHoverPhoto(false)}
            >
                <Avatar className="w-full h-full">
                    <AvatarImage
                    src={profile.avatarUrl}
                    alt={`@${profile.displayName}`}
                    />
                    <AvatarFallback>
                        {profile.displayName.charAt(0)}
                    </AvatarFallback>
                </Avatar>

                <div
                className={`absolute inset-0 
                flex items-center justify-center 
                bg-black/25 active:bg-black/50 duration-50
                ${hoverPhoto ? "opacity-100" : "opacity-0"}`}
                onClick={() => handleClick()}
                >
                    <Camera />
                </div>
            </div>

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