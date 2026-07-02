import { useState, useEffect, useRef } from "react"
import { useForm, Controller } from "react-hook-form"
import { useNavigate } from "react-router"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"

// api
import { getGlobalChat, postGlobalChat } from "@/api/chat"

// components
import { 
    InputGroup,
    InputGroupAddon ,
    InputGroupButton,
    InputGroupTextarea,
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

// contexts
import { useAuth } from "@/components/contexts/AuthContext"

// helpers
import { isNewDay } from "@/helpers/isNewDay"
import { isNewSender } from "@/helpers/isNewSender"

// icons
import { SendHorizonal } from "lucide-react"

// schemas
import { messageSchema } from "@/components/schemas/chat"

// types
import type { Message } from "@/components/types/Message"

export function HomeContent() {
    const [ globalChat, setGlobalChat ] = useState<Message[]>([]);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const bottomRef = useRef<HTMLDivElement>(null);
    const { user } = useAuth();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof messageSchema>>({
        resolver: zodResolver(messageSchema),
        defaultValues: {
            content: ""
        },
        mode: "onChange"
    });

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

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [globalChat]);

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
        <div className={`flex flex-col flex-1 gap-4
        bg-accent rounded-sm m-2 p-4`}>
            <p className="text-2xl font-bold">Global Chat</p>
            <Separator/>

            {/* Chat Content */}
            <div className="flex-1 flex flex-col overflow-auto">
                {globalChat.map((chat, index) => {
                    const showDate = isNewDay(
                        chat.createdAt,
                        globalChat[index-1]?.createdAt
                    )

                    const showAvatar = isNewSender(
                        chat,
                        globalChat[index-1]
                    )

                    const currentUserMessage = chat.sender.id === user?.id;

                    return (
                        <div key={chat.id}>
                            {showDate &&
                            <div className="flex justify-center my-4"> 
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
                            <div className={`flex gap-2 items-end p-1 ${showAvatar && "mt-4"} 
                            hover:bg-ring/25 duration-50 rounded-xs`}>
                                {!currentUserMessage ? 
                                <>
                                    {showAvatar ?
                                    <Avatar 
                                    size="lg"
                                    className="cursor-pointer"
                                    onClick={() => navigate(`/profile/${chat.sender.id}`)}
                                    >
                                        <AvatarFallback>{chat.sender.displayName.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    :
                                    <div className="w-10" />
                                    }
                                    <div className="flex-1 flex flex-col gap-1">
                                        {showAvatar &&
                                        <p 
                                        className="text-xs hover:underline cursor-pointer"
                                        onClick={() => navigate(`/profile/${chat.sender.id}`)}
                                        >
                                            {chat.sender.displayName}
                                        </p>
                                        }
                                        <div
                                            className="text-primary text-sm
                                            w-full whitespace-pre-wrap break-all"
                                            >
                                            {chat.content}
                                        </div>
                                    </div>
                                </> : <>
                                    <div className="flex-1 flex flex-col gap-1 text-right">
                                        {showAvatar &&
                                        <p className="text-xs">{chat.sender.displayName}</p>
                                        }
                                        <div
                                            className="text-primary text-sm
                                            w-full whitespace-pre-wrap break-all"
                                            >
                                            {chat.content}
                                        </div>
                                    </div>
                                    {showAvatar ?
                                    <Avatar size="lg">
                                        <AvatarFallback>{chat.sender.displayName.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    :
                                    <div className="w-10" />
                                    }
                                </>
                                }
                            </div>
                        </div>
                    )})}
                <div ref={bottomRef} />
            </div>

            {/* Textarea */}
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <Controller 
                    name="content"
                    control={form.control}
                    disabled={!user || isLoading}
                    render={({ field, fieldState }) => (
                        <Field>
                            <InputGroup>
                                <InputGroupTextarea 
                                {...field}
                                aria-invalid={fieldState.invalid}
                                placeholder={`${user ? "Write a message..." : "Sign in to chat."}`} 
                                />
                                <InputGroupAddon align="block-end" className="cursor-default">
                                    <p>{field.value.length}/500</p>
                                    <InputGroupButton 
                                    className="ml-auto cursor-pointer hover:bg-muted-foreground/25"
                                    disabled={!user || isLoading}
                                    type="submit"
                                    size="icon-sm"
                                    >
                                        <SendHorizonal className="text-muted-foreground" />
                                    </InputGroupButton>
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