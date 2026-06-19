import { useState, createContext, useEffect, useContext } from "react";

// api
import { getCurrentUser } from "@/api/auth";

// types
import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { User } from "@/components/types/User";

type AuthContextProps = {
    user: User|undefined,
    setUser: Dispatch<SetStateAction<User|undefined>>,
    isAuthLoading: boolean,
    setIsAuthLoading: Dispatch<SetStateAction<boolean>>
}
const AuthContext = createContext<AuthContextProps>({
    user: undefined,
    setUser: () => {},
    isAuthLoading: false,
    setIsAuthLoading: () => {}
});
export function AuthProvider({ children }: { children: ReactNode}) {
    const [ user, setUser ] = useState<User|undefined>();
    const [ isAuthLoading, setIsAuthLoading ] = useState(false);

    useEffect(() => {
        async function getUser() {
            setIsAuthLoading(true);
            try {
                const result = await getCurrentUser();
                if(result) setUser(result.user)
            } catch {
                setUser(undefined);
            } finally {
                setIsAuthLoading(false);
            }
        }

        getUser();
    }, []);

    const values = {
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