import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"

// api
import { getGlobalChat, postGlobalChat } from "@/api/chat"

// components
import { 
    InputGroup,
    InputGroupTextarea,
    InputGroupAddon 
} from "@/components/ui/input-group"
import { 
    Field,
    FieldError
} from "@/components/ui/field"
import { 
    Avatar,
    AvatarImage,
    AvatarFallback 
} from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

// contexts
import { useAuth } from "@/components/contexts/AuthContext"
import { useUI } from "@/components/contexts/UIContext"

// helpers
import { isNewDay } from "@/helpers/isNewDay"

// icons
import { SendHorizonal } from "lucide-react"

// schemas
import { messageSchema } from "@/components/schemas/chat"

// types
import type { Message } from "@/components/types/Message"

export function HomeContent() {
    const [ globalChat, setGlobalChat ] = useState<Message[]>([]);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const { user } = useAuth();

    useEffect(() => {
        if(globalChat.length > 0) return;

        async function fetchGlobalChat() {
            setIsLoading(true);
            try {
                const result = await getGlobalChat();
                if(result) setGlobalChat(result.messages);
            } finally {
                setIsLoading(false);
            }
        }

        fetchGlobalChat();
    }, []);

    const form = useForm<z.infer<typeof messageSchema>>({
        resolver: zodResolver(messageSchema),
        defaultValues: {
            content: ""
        },
        mode: "onChange"
    });

    async function handleSubmit(data: z.infer<typeof messageSchema>) {
        setIsLoading(true);
        try {
            const result = await postGlobalChat(data);
            if(result) {
                setGlobalChat((prev) => (
                    [ ...prev, result ]
                ));
                form.reset();
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex-1 flex flex-col gap-4
        bg-accent rounded-sm 
        m-2 ml-0 p-4">
            <p className="text-2xl font-bold">Global Chat</p>
            <Separator/>

            {/* Chat Content */}
            <div className="flex-1 flex flex-col gap-4 overflow-auto">
                {globalChat.map((chat, index) => {
                    const showDate = isNewDay(
                        chat.createdAt,
                        globalChat[index-1]?.createdAt
                    )

                    return (
                        <div key={chat.id}>
                            {showDate &&
                            <div className="flex justify-center"> 
                                <p
                                className="text-xs text-muted-foreground "
                                >
                                    {new Date(chat.createdAt).toLocaleDateString(
                                        undefined,
                                        {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric"
                                        }
                                    )}
                                </p>
                            </div>
                            }
                            <div className="flex gap-2 items-end">
                                <Avatar size="lg">
                                    <AvatarFallback>{chat.sender.displayName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <p className="text-xs">{chat.sender.displayName}</p>
                                    <div
                                        className="bg-ring/20 text-primary text-sm rounded-xl
                                        py-2 px-4 w-fit max-w-sm"
                                        >
                                        {chat.content}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )})}
            </div>

            {/* Textarea */}
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <Controller 
                    name="content"
                    control={form.control}
                    disabled={!user || isLoading}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.error}>
                            <InputGroup>
                                <InputGroupTextarea 
                                {...field}
                                aria-invalid={fieldState.invalid}
                                placeholder={`${user ? "Write a message..." : "Sign in to chat."}`} 
                                />
                                <InputGroupAddon align="block-end" className="cursor-default">
                                    <p>{field.value.length}/500</p>
                                    <Button 
                                    className="ml-auto cursor-pointer bg-transparent hover:bg-muted-foreground/25"
                                    disabled={!user || isLoading}
                                    type="submit"
                                    size="icon-sm"
                                    >
                                        <SendHorizonal className="text-muted-foreground" />
                                    </Button>
                                </InputGroupAddon>
                            </InputGroup>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
            </form>
        </div>
    )
}