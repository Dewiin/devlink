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
    setUser: Dispatch<SetStateAction<User|undefined>>,
    isAuthLoading: boolean,
    setIsAuthLoading: Dispatch<SetStateAction<boolean>>
}
const AuthContext = createContext<AuthContextProps>({
    token: null,
    setToken: () => {},
    user: undefined,
    setUser: () => {},
    isAuthLoading: false,
    setIsAuthLoading: () => {}
});
export function AuthProvider({ children }: { children: ReactNode}) {
    const [ token, setToken ] = useState<string|null>(null); 
    const [ user, setUser ] = useState<User|undefined>();
    const [ isAuthLoading, setIsAuthLoading ] = useState(false);

    useEffect(() => {
        async function getUser() {
            setIsAuthLoading(true);
            try {
                const accessToken = localStorage.getItem("accessToken");
                setToken(accessToken);
                if(accessToken) {
                    const result = await getCurrentUser(accessToken);
                    if(result) setUser(result.user)
                }
            } finally {
                setIsAuthLoading(false);
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
        setUser,
        isAuthLoading, 
        setIsAuthLoading
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