import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router"

// api
import { getProfile, updateAvatar, updateBanner } from "@/api/user";

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
import { Camera, Edit2 } from "lucide-react";

// types 
import type { User } from "@/components/types/User";

export function ProfileContent() {
    const [ profile, setProfile ] = useState<User|undefined>();
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ hoverPhoto, setHoverPhoto ] = useState<boolean>(false);
    const avatarFileInputRef = useRef<HTMLInputElement>(null);
    const bannerFileInputRef = useRef<HTMLInputElement>(null);

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

    function handleClick(uploadType: "avatar" | "banner") {
        if(uploadType === "avatar") avatarFileInputRef.current?.click();
        if(uploadType === "banner") bannerFileInputRef.current?.click();
    }

    async function handleAvatarFileChange(e: React.ChangeEvent<HTMLInputElement>) {
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

    async function handleBannerFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        toast.promise(async () => {
            const result = await updateBanner(file, setSonner);
            if(result.bannerUrl) {
                setProfile((prev) => {
                    if(!prev) return prev;

                    return {
                        ...prev,
                        bannerUrl: result.bannerUrl
                    }
                });
            }
        }, {
            loading: "Updating banner...",
            position: "top-right"
        }
        );
    }

    return (
        <div className="flex-1 flex flex-col gap-4
        bg-accent rounded-sm 
        m-2 p-4">
            {profile && <>
            <div
            className="w-full outline-1 h-50 rounded-sm relative overflow-hidden"
            >
                <img 
                className="w-full h-full object-cover" 
                src={`${profile.bannerUrl ? profile.bannerUrl : "/src/assets/background.jpg"}`}
                />
                {user && profile.id === user.id && 
                <Edit2
                size={16}
                className="absolute right-0 top-0 cursor-pointer
                p-2 m-2 w-fit h-fit rounded-lg
                hover:bg-black/25 active:bg-black/50 duration-100"
                onClick={() => handleClick("banner")}
                />
                }
            </div>

            <input
                ref={avatarFileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarFileChange}
            />

            <input
                ref={bannerFileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleBannerFileChange}
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

                {user && profile.id === user.id && 
                <div
                className={`absolute inset-0 
                    flex items-center justify-center 
                    bg-black/25 active:bg-black/50 duration-50
                    ${hoverPhoto ? "opacity-100" : "opacity-0"}`}
                    onClick={() => handleClick("avatar")}
                    >
                    <Camera />
                </div>
                }
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