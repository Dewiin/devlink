import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { formatDistanceToNow } from "date-fns"

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
    const [ filteredUsers, setFilteredUsers ] = useState<User[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchGlobalUsers() {
            const result = await getAllUsers();
            if(result) {
                setUsers(result);
                setFilteredUsers(result);
            }
        }

        fetchGlobalUsers();
    }, []);

    function handleSearch(data: string) {
        const filtered = users.filter((user) => 
            user.displayName.toLocaleLowerCase().includes(data.toLocaleLowerCase())
        );
        setFilteredUsers(filtered);
    }

    return (
        <div 
        className="w-xs
        bg-accent rounded-sm m-2 mr-0 p-4
        flex flex-col gap-4"
        >   
            <p className="text-2xl font-bold">Users</p>

            <InputGroup>
                <InputGroupInput 
                placeholder="Search for a user"
                onChange={(e) => handleSearch(e.target.value)}
                />
                <InputGroupAddon>
                    <Search />
                </InputGroupAddon>
            </InputGroup>

            <div className="flex flex-col overflow-auto">
                {filteredUsers.map((user) => (
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
                        <div className="flex flex-col">
                            <p className="text-sm">{user.displayName}</p>
                            <p className="w-50 text-xs text-muted-foreground truncate"> joined {formatDistanceToNow(user.createdAt)} ago</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}