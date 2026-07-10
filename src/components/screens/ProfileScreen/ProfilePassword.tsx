import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"

// api
import { updatePassword } from "@/api/user"

// components
import { 
    InputGroup,
    InputGroupInput,
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

// icons
import { Eye, EyeOff } from "lucide-react"

// schemas
import { passwordSchema } from "@/components/schemas/profile"

export function ProfilePassword() {
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ passwordVisible, setPasswordVisible ] = useState({
        "old": false,
        "new": false
    });
    const { setSonner } = useUI();
    
    const form = useForm<z.infer<typeof passwordSchema>>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: ""
        },
        mode: "onChange"
    });

    async function handleSubmit(data: z.infer<typeof passwordSchema>) {
        console.log(data);
        toast.promise(async () => {
            setIsLoading(true);
            try {
                await updatePassword(data, setSonner);
            } finally {
                setIsLoading(false);
            }
        }, {
            loading: "Updating password...",
            position: "top-right"
        });
    }

    return (
        <div className="flex-1 flex flex-col gap-4
        bg-accent rounded-sm 
        m-2 p-4">
            <p className="text-2xl font-bold mb-4">
                Edit Profile
            </p>
            
            <form 
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(handleSubmit)}
            >
                <Controller
                name="oldPassword"
                control={form.control}
                render={({field, fieldState}) => (
                    <Field>
                        <FieldLabel>Old Password</FieldLabel>
                        <InputGroup>
                            <InputGroupInput 
                            {...field}
                            aria-invalid={fieldState.invalid}
                            type={passwordVisible["old"] ? "text" : "password"}
                            autoComplete="new-password"
                            disabled={isLoading}
                            />
                            <InputGroupAddon align="inline-end" className="*:cursor-pointer">
                                { passwordVisible["old"] ? 
                                <Eye onClick={() => setPasswordVisible(prev => ({
                                    ...prev,
                                    "old": false
                                }))} />
                                :
                                <EyeOff onClick={() => setPasswordVisible(prev => ({
                                    ...prev,
                                    "old": true
                                }))} />
                                }
                            </InputGroupAddon>
                        </InputGroup>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
                />

                <Controller
                name="newPassword"
                control={form.control}
                render={({field, fieldState}) => (
                    <Field>
                        <FieldLabel>New Password</FieldLabel>
                        <InputGroup>
                            <InputGroupInput 
                            {...field}
                            aria-invalid={fieldState.invalid}
                            type={passwordVisible["new"] ? "text" : "password"}
                            autoComplete="new-password"
                            disabled={isLoading}
                            />
                            <InputGroupAddon align="inline-end" className="*:cursor-pointer">
                                { passwordVisible["new"] ? 
                                <Eye onClick={() => setPasswordVisible(prev => ({
                                    ...prev,
                                    "new": false
                                }))} />
                                :
                                <EyeOff onClick={() => setPasswordVisible(prev => ({
                                    ...prev,
                                    "new": true
                                }))} />
                                }
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
        </div>
    )
}