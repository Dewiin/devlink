import { useLocation, useNavigate } from "react-router"

// api
import { logout } from "@/api/auth";

// components
import { Separator } from "@/components/ui/separator"
import { Spinner } from "@/components/ui/spinner";
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
    LogIn
} from "lucide-react"

export function Sidebar() {
    const { user, setUser, isAuthLoading } = useAuth();
    const { setSonner } = useUI();
    const location = useLocation();
    const navigate = useNavigate();

    const active = location.pathname.startsWith("/chats") 
    ? "chat" : "global";

    function handleLogout() {
        toast.promise(async () => {
            const result = await logout(setSonner);
            if(result) setUser(undefined);
        }, {
            loading: "Logging out..."
        });
    }

    return (
        <div
        className="p-4 h-full 
        flex flex-col gap-4
        bg-sidebar text-sm font-semibold select-none"
        >
            <div className="w-12 h-12 bg-black rounded-sm m-auto" />

            <Separator />

            <div className="flex flex-col flex-1 gap-1
            *:flex *:gap-2 *:items-center *:p-2 *:pr-12 *:rounded-sm *:cursor-pointer
            *:hover:bg-accent *:active:bg-accent/50 *:duration-100 
            ">
                <div 
                className={`${active === "global" && "bg-accent"}`}
                onClick={() => navigate("/")}
                >
                    <Globe />
                    <p>Global</p>
                </div>
                <div 
                className={`${active === "chat" && "bg-accent"}`}
                onClick={() => navigate("/chats")}
                >
                
                    <MessageSquare />
                    <p>Chats</p>
                </div>
            </div>

            <Separator />
            
            <div className="flex flex-col gap-1
            *:flex *:gap-2 *:items-center *:p-2 *:pr-12 *:rounded-sm *:cursor-pointer
            *:hover:bg-accent *:active:bg-accent/50 *:duration-100
            ">
                {isAuthLoading &&
                <div>
                    <Spinner className="size-6" />
                </div>
                }
                {!isAuthLoading && user &&
                <>
                    <div>
                        <CircleUser />
                        <p>{user.displayName}</p>
                    </div>
                    <div
                    onClick={() => handleLogout()}
                    >
                        <LogOut />
                        <p>Logout</p>
                    </div>
                </>
                }
                {!isAuthLoading && !user && 
                    <div
                    onClick={() => navigate("/login")}
                    >
                        <LogIn />
                        <p>Sign In</p>
                    </div>
                }
            </div>
        </div>
    )
}