import { useForm, Controller,  } from "react-hook-form"
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react";
import z from "zod"

// api
import { signup } from "@/api/auth";

// components
import { 
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter
} from "@/components/ui/card";
import { 
    FieldGroup,
    Field,
    FieldLabel,
    FieldError
} from "@/components/ui/field";
import { 
    InputGroup,
    InputGroupAddon,
    InputGroupInput 
} from "@/components/ui/input-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { GoogleLogo } from "@/components/ui/googleLogo";
import { AuthBackground } from "./AuthBackground";
import { toast } from "sonner";

// contexts
import { useAuth } from "@/components/contexts/AuthContext";
import { useUI } from "@/components/contexts/UIContext";

// icons
import { Eye, EyeOff } from "lucide-react";

// schemas
import { signupSchema } from "@/components/schemas/auth"

export function SignupScreen() {
    const [ passwordVisible, setPasswordVisible ] = useState(false);
    const { user, setUser, setToken }= useAuth();
    const { setSonner } = useUI();
    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            displayName: "",
            email: "",
            password: ""
        },
        mode: "onChange"
    });

    async function handleSubmit(data: z.infer<typeof signupSchema>) {
        console.log(data);
        toast.promise(async() => {
            const result = await signup(data, setSonner);

            if(result) {
                setToken(result.accessToken);
                setUser(result.user);
            }
        },
        { loading: "Creating new account..." }
        );
    };

    return (
        <div className="relative w-full h-full
        flex justify-center items-center">
            <div className="absolute inset-2 -z-10">
                <AuthBackground />
            </div>
            
            <div className="flex flex-col gap-2 
            p-4 max-w-lg md:w-md w-sm">
                <div className="flex gap-2 items-end">
                    <img
                    src="/src/assets/logo.png"
                    className="rounded-xl outline-1"
                    width={50}
                    />
                    <p className="font-semibold text-3xl">devLink</p>
                </div>
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Create an account</CardTitle>
                        <CardDescription>Enter your details below to create your account.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form 
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="flex flex-col gap-4"
                        >
                            <FieldGroup>
                                <Controller
                                name="displayName"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.error}>
                                        <FieldLabel>Display name</FieldLabel>
                                        <Input 
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="John Doe"
                                        autoComplete="new-password"
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                                />
                                <Controller
                                name="email"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.error}>
                                        <FieldLabel>Email</FieldLabel>
                                        <Input 
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="d@example.com"
                                        autoComplete="new-password"
                                        />
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                                />
                                <Controller
                                name="password"
                                control={form.control}
                                render={({field, fieldState}) => (
                                    <Field data-invalid={fieldState.error}>
                                        <FieldLabel>Password</FieldLabel>
                                        <InputGroup>
                                            <InputGroupInput 
                                            {...field}
                                            aria-invalid={fieldState.invalid}
                                            type={passwordVisible ? "text" : "password"}
                                            autoComplete="new-password"
                                            />
                                            <InputGroupAddon 
                                            align="inline-end"
                                            className="cursor-pointer"
                                            onClick={() => setPasswordVisible(prev => !prev)}
                                            >
                                                {passwordVisible ? <Eye /> : <EyeOff />}
                                            </InputGroupAddon>
                                        </InputGroup>
                                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )}
                                />
                            </FieldGroup>
                            <Button 
                            className="w-full cursor-pointer"
                            >
                                Create an account
                            </Button>
                            <div className="relative flex items-center gap-2">
                                <Separator className="flex-1" />
                                <span className="shrink-0 px-2 text-muted-foreground text-xs uppercase">
                                    Or continue with
                                </span>
                                <Separator className="flex-1" />
                            </div>
                            <Button
                            className="w-full cursor-pointer"
                            variant="outline"
                            >
                                <GoogleLogo />
                                Continue with Google
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <p className="w-full text-muted-foreground text-sm text-center">
                            Already have an account?{" "}
                            <button 
                            className="font-medium underline cursor-pointer" 
                            type="button"
                            onClick={() => navigate("/login")}
                            >
                                Sign In
                            </button>
                        </p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}