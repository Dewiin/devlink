import { useState, useEffect } from "react"
import { useNavigate } from "react-router"

// api
import { getAllUsers } from "@/api/user"

// components
import { 
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import { 
    Avatar,
    AvatarFallback 
} from "@/components/ui/avatar"

// icons
import { Search } from "lucide-react"

// types
import type { User } from "@/components/types/User"

export function HomeSidebar() {
    const [ users, setUsers ] = useState<User[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchGlobalUsers() {
            const result = await getAllUsers();
            if(result) setUsers(result);
        }

        fetchGlobalUsers();
    }, []);

    return (
        <div 
        className="w-xs 
        bg-accent rounded-sm m-2 p-4
        flex flex-col gap-4"
        >   
            <p className="text-2xl font-bold">Users</p>

            <InputGroup>
                <InputGroupInput 
                placeholder="Search for a user"
                />
                <InputGroupAddon>
                    <Search />
                </InputGroupAddon>
            </InputGroup>

            <div className="flex flex-col overflow-auto">
                {users.map((user) => (
                    <div
                    key={user.id}
                    className="flex gap-2 items-center 
                    text-sm font-medium
                    rounded-sm cursor-pointer py-2 px-4 
                    hover:bg-chart-4/75 active:bg-chart-4 duration-100"
                    onClick={() => navigate(`/profile/${user.id}`)}
                    >
                        <Avatar>
                            <AvatarFallback>
                                {user.displayName.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <p>{user.displayName}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}