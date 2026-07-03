import { useState, useEffect, useRef } from "react"
import { useForm, Controller } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

// api
import { getConversation, postChat } from "@/api/chat";

// components
import { 
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupTextarea,
} from "@/components/ui/input-group";
import { 
    Field,
    FieldError 
} from "@/components/ui/field";
import { 
    Avatar,
    AvatarFallback, 
    AvatarImage
} from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// contexts
import { useAuth } from "@/components/contexts/AuthContext";
import { useUI } from "@/components/contexts/UIContext";

// helpers
import { isNewDay } from "@/helpers/isNewDay";
import { isNewSender } from "@/helpers/isNewSender";

// icons
import { ChevronLeft, SendHorizonal } from "lucide-react";

// schemas
import { messageSchema } from "@/components/schemas/chat";

// types
import type { Conversation } from "@/components/types/Conversation"
import type { User } from "@/components/types/User";

export function ChatContent() {
    const [ conversation, setConversation ] = useState<Conversation|null>(null);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ recipient, setRecipient ] = useState<User>();

    const bottomRef = useRef<HTMLDivElement>(null);
    const { recipientId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { isMobile } = useUI();

    const form = useForm<z.infer<typeof messageSchema>>({
        resolver: zodResolver(messageSchema),
        defaultValues: {
            content: ""
        },
        mode: "onChange"
    })

    useEffect(() => {
        async function fetchChat() {
            if(!recipientId) return;
            setIsLoading(true);
            try {
                const result = await getConversation(recipientId);
                if(result) {
                    setConversation(result);
                    setRecipient(result.participants.find(
                        participant => participant.id === recipientId
                    ));
                }
            } finally {
                setIsLoading(false);
            }
        }

        fetchChat();
    }, [recipientId]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth"
        });
    }, [conversation]);

    async function handleSubmit(data: z.infer<typeof messageSchema>) {
        if(!conversation) return;

        const result = await postChat(data, conversation.id);

        if(result) {
            setConversation((prev) => {
                if(!prev) return prev;
                return {
                    ...prev,
                    messages: [
                        ...prev.messages, result
                    ]
                }
            });
            form.reset();
        }
    }

    return (
        <div className="flex-1
        bg-accent rounded-sm 
        m-2 p-4">
            <div className="h-full flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                    {isMobile && 
                    <ChevronLeft 
                    onClick={() => navigate("/chats")}
                    />
                    }

                    {!isLoading && recipient &&
                    <p className="text-2xl font-bold">
                        {recipient.displayName}
                    </p>
                    }
                    {isLoading && 
                    <p className="text-2xl font-bold">
                        ...
                    </p>
                    }
                </div>
                <Separator/>    

                {/* Chat Content */}
                <div className="flex-1 flex flex-col overflow-auto">
                    {!isLoading && user && conversation && conversation.messages.map((chat, index) => {
                        const showDate = isNewDay(
                            chat.createdAt,
                            conversation.messages[index-1]?.createdAt
                        )

                        const showAvatar = isNewSender(
                            chat,
                            conversation.messages[index-1]
                        )

                        const currentUserMessage = chat.sender.id === user.id;

                        return (
                            <div key={chat.id}>
                                {showDate &&
                                <div className="flex justify-center my-4"> 
                                    <p
                                    className="text-xs text-muted-foreground"
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
                                            <AvatarImage
                                            src={chat.sender.avatarUrl}
                                            alt={`@${chat.sender.displayName}`}
                                            />
                                            <AvatarFallback>{chat.sender.displayName.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        :
                                        <div className="w-10" />
                                        }
                                        <div className="flex-1 flex flex-col gap-1">
                                            {showAvatar &&
                                            <p 
                                            className="text-xs cursor-pointer hover:underline"
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
                                            <p 
                                            className="text-xs cursor-pointer hover:underline"
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
                                        {showAvatar ?
                                        <Avatar 
                                        size="lg"
                                        className="cursor-pointer"
                                        onClick={() => navigate(`/profile/${chat.sender.id}`)}
                                        >
                                            <AvatarImage
                                            src={chat.sender.avatarUrl}
                                            alt={`@${chat.sender.displayName}`}
                                            />
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
                    render={({field, formState, fieldState}) => (
                        <Field>
                            <InputGroup>
                                <InputGroupTextarea
                                {...field}
                                aria-invalid={fieldState.invalid}
                                disabled={!conversation || !user || isLoading || formState.isSubmitting}
                                placeholder={`${user ? "Write a message..." : "Sign in to chat."}`} 
                                />
                                <InputGroupAddon align="block-end" className="cursor-default">
                                    <p>{field.value.length}/500</p>
                                    <InputGroupButton 
                                    className="ml-auto cursor-pointer hover:bg-muted-foreground/25"
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
        </div>
    )
}