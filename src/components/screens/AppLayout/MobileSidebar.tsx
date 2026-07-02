import { useLocation, useNavigate } from "react-router"
import { useState } from "react";

// api
import { logout } from "@/api/auth";

// components
import { HomeSidebar } from "../HomeScreen/HomeSidebar";
import { toast } from "sonner";

// contexts
import { useAuth } from "@/components/contexts/AuthContext";
import { useUI } from "@/components/contexts/UIContext";

// icons
import { 
    Globe,
    MessageSquare,
    CircleUser, 
    LogOut, 
    LogIn,
    UserSearchIcon
} from "lucide-react"

export function MobileSidebar() {
    const { user, setUser } = useAuth();
    const { setSonner } = useUI();
    const location = useLocation();
    const navigate = useNavigate();
    const [ active, setActive ] = useState<string>(location.pathname.split("/")[1]);

    function handleLogout() {
        toast.promise(async () => {
            const result = await logout(setSonner);
            if(result) setUser(undefined);
        }, {
            loading: "Logging out..."
        });
    }

    return (
        <div className="w-full h-fit
        flex justify-between
        bg-sidebar text-sm font-semibold select-none
        *:flex-1 *:p-4 *:*:m-auto *:rounded-xs *:duration-150">
            <div
            className={`${active === "" && "bg-accent"}`}
            onClick={() => {
                setActive("");
                navigate("/");
            }}
            >
                <Globe />
            </div>
            
            <div 
            className={`${active === "chats" && "bg-accent"}`}
            onClick={() => {
                setActive("chats");
                navigate("/chats");
            }}
            >
                <MessageSquare />
            </div>

            {user && 
            <div 
            className={`${active === "profile" && "bg-accent"}`}
            onClick={() => {
                setActive("profile");
                navigate(`/profile/${user.id}`)
            }}
            >
                <CircleUser />
            </div>
            }

            <div 
            className={`${active === "searchUser" && "bg-accent"}`}
            onClick={() => {
                setActive("searchUser");
                navigate({
                    pathname: '/',
                    search: "?view=search"
                })
            }}
            >
                <UserSearchIcon />
            </div>

            {!user && 
            <div 
            className={`${active === "login" && "bg-accent"}`}
            onClick={() => {
                setActive("login");
                navigate("/login");
            }}
            >
                <LogIn />
            </div>
            }

            {user && 
            <div 
            onClick={() => handleLogout()}
            >
                <LogOut />
            </div>
            }
        </div>
    )
}