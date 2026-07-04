import { useNavigate, useParams } from "react-router"

// contexts
import { useAuth } from "@/components/contexts/AuthContext";

// icons
import { ChevronLeft } from "lucide-react"

export function ProfileSidebar() {
    const { user } = useAuth();
    const { edit } = useParams();
    const navigate = useNavigate();

    return (
        <div className="w-xs 
        bg-accent rounded-sm m-2 mr-0 p-4">
            <div 
            className="flex gap-2 items-center cursor-pointer w-fit"
            onClick={() => navigate(-1)}
            >
                <ChevronLeft />
                <p className="font-medium text-sm"> Return </p>
            </div>

            { user && 
            <div className="flex flex-col gap-2 
            mt-8 cursor-pointer font-medium
            *:p-2 *:rounded-sm *:text-sm 
            *:hover:bg-chart-4/75 *:active:bg-chart-4">
                <p
                className={`${!edit && "bg-chart-4/75"}`}
                onClick={() => navigate(`/profile/${user.id}`)}
                > 
                    Your Profile 
                </p>
                <p
                className={`${edit === "edit" && "bg-chart-4/75"}`}
                onClick={() => navigate(`/profile/${user.id}/edit`)}
                > 
                    Edit Profile 
                </p>
                <p
                className={`${edit === "password" && "bg-chart-4/75"}`}
                onClick={() => navigate(`/profile/${user.id}/password`)}
                > 
                    Change Password 
                </p>
            </div>
            }
        </div>
    )
}