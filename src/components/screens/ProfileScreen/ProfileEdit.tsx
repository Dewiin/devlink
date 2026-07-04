import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"

// api
import { updateProfile } from "@/api/user"

// components
import { 
    InputGroup,
    InputGroupInput,
    InputGroupTextarea,
    InputGroupAddon, 
} from "@/components/ui/input-group"
import { 
    Field,
    FieldLabel,
    FieldError
} from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

// contexts
import { useUI } from "@/components/contexts/UIContext"

// schemas
import { profileSchema } from "@/components/schemas/profile"

// types
import type { User } from "@/components/types/User"
import type { Dispatch, SetStateAction } from "react"

type ProfileEditProps = {
    profile: User|undefined,
    setProfile: Dispatch<SetStateAction<User|undefined>>
}
export function ProfileEdit({
    profile,
    setProfile
}: ProfileEditProps) {
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const { setSonner } = useUI();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            "displayName": profile?.displayName ?? "",
            "bio": profile?.bio ?? ""
        },
        mode: "onChange"
    });

    useEffect(() => {
        if(!profile) return;

        form.reset({
            displayName: profile.displayName,
            bio: profile.bio
        });
    }, [profile]);

    async function handleSubmit(data: z.infer<typeof profileSchema>) {
        if(!profile) return;
        toast.promise(async () => {
            setIsLoading(true);
            try {
                const result = await updateProfile(data, setSonner);
                if(result) {
                    setProfile((prev) => {
                        if(!prev) return prev;
                        return {
                            ...prev,
                            displayName: data.displayName,
                            bio: data.bio
                        }
                    });
                    navigate(`/profile/${profile.id}`);
                }
            } finally {
                setIsLoading(false);
            }
        }, {
            loading: "Updating profile...",
            position: "top-right"
        });
    }

    return (
        <div className="flex-1 flex flex-col gap-4
        bg-accent rounded-sm 
        m-2 p-4">
            {profile &&
            <>
            <p className="text-2xl font-bold mb-4">
                Edit Profile
            </p>
            
            <form 
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(handleSubmit)}
            >
                <Controller
                name="displayName"
                control={form.control}
                render={({field, formState, fieldState}) => (
                    <Field>
                        <FieldLabel>Display Name</FieldLabel>
                        <InputGroup>
                            <InputGroupInput 
                            {...field}
                            aria-invalid={fieldState.invalid}
                            disabled={isLoading}
                            />
                        </InputGroup>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
                />

                <Controller
                name="bio"
                control={form.control}
                render={({field, formState, fieldState}) => (
                    <Field>
                        <FieldLabel>Bio</FieldLabel>
                        <InputGroup>
                            <InputGroupTextarea 
                            {...field}
                            aria-invalid={fieldState.invalid}
                            className="max-h-100"
                            disabled={isLoading}
                            />
                            <InputGroupAddon align="block-end">
                                {field.value.length}/500
                            </InputGroupAddon>
                        </InputGroup>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
                />

                <Button 
                className="w-fit cursor-pointer" 
                type="submit"
                disabled={isLoading}
                >
                    Submit
                </Button>
            </form>
            </>
            }
        </div>
    )
}