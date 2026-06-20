import { 
    createContext, 
    useContext, 
    useState, 
    useEffect 
} from "react";

// components
import { toast } from "sonner";

// types
import type { Dispatch, SetStateAction, ReactNode } from "react";
import type { Sonner } from "@/components/types/Sonner";

type UIContextProps = {
    sonner: Sonner,
    setSonner: Dispatch<SetStateAction<Sonner>>,
}
const UIContext = createContext<UIContextProps>({
    sonner: { type: undefined },
    setSonner: () => {}
});
export function UIProvider({ children }: { children: ReactNode}) {
    const [ sonner, setSonner ] = useState<Sonner>({ type: undefined });

    useEffect(() => {
        const type = sonner.type;
        const title = sonner.title;
        const description = sonner.description;
        if(type) {
            if(type === "success") toast.success(title, { description, richColors: true, position: "top-right" })
            if(type === "warning") toast.warning(title, { description, richColors: true, position: "top-right" })
            if(type === "error") toast.error(title, { description, richColors: true, position: "top-right" })
        }
    }, [ sonner ]);

    const values = {
        sonner,
        setSonner
    }

    return (
        <UIContext value={values}>
            { children }
        </UIContext>
    )
}

export function useUI() {
    return useContext(UIContext);
}