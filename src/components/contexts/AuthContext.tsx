import { useState, createContext, useEffect, useContext } from "react";

// api
import { getCurrentUser } from "@/api/auth";

// types
import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { User } from "@/components/types/User";

type AuthContextProps = {
    token: string|null,
    setToken: Dispatch<SetStateAction<string|null>>,
    user: User|undefined,
    setUser: Dispatch<SetStateAction<User|undefined>>
}
const AuthContext = createContext<AuthContextProps>({
    token: null,
    setToken: () => {},
    user: undefined,
    setUser: () => {}
});
export function AuthProvider({ children }: { children: ReactNode}) {
    const [ token, setToken ] = useState<string|null>(null); 
    const [ user, setUser ] = useState<User|undefined>();

    useEffect(() => {
        async function getUser() {
            if(token) {
                const result = await getCurrentUser(token);
                if(result) setUser(result.user)
            }
        }

        getUser();
    }, []);

    useEffect(() => {
        if(token) localStorage.setItem("accessToken", token);
    }, [token]);

    const values = {
        token, 
        setToken,
        user, 
        setUser
    }
    return (
        <AuthContext value={values}>
            { children }
        </AuthContext>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}