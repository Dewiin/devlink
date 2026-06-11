import z from "zod";

// Username and passphrase parameters
const PASS_LEN_MINIMUM = 8
const PASS_LEN_MAXIMUM = 512
const PRINTABLE_UNICODE = /^[\P{Cc}\P{Cn}\P{Cs}]+$/gu // allow only, printable (unicode) characters; https://stackoverflow.com/a/12054775
const PRINTABLE_MESSAGE = "can only contain printable characters."

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(PASS_LEN_MINIMUM, {
        message: "Password must be at least " + PASS_LEN_MINIMUM + " characters."
    }). max(PASS_LEN_MAXIMUM, {
        message: "Password has a " + PASS_LEN_MAXIMUM + " character limit."
    }).regex(PRINTABLE_UNICODE, { 
        message: "Password " + PRINTABLE_MESSAGE
    }),
});

export const signupSchema = z.object({
    displayName: z.string().trim().min(1, {
        error: "Name must have a character."
    }).max(20, {
        error: "Name is limited to 20 characters."
    }),
    email: z.email(),
    password: z.string().min(PASS_LEN_MINIMUM, {
        message: "Password must be at least " + PASS_LEN_MINIMUM + " characters."
    }). max(PASS_LEN_MAXIMUM, {
        message: "Password has a " + PASS_LEN_MAXIMUM + " character limit."
    }).regex(PRINTABLE_UNICODE, { 
        message: "Password " + PRINTABLE_MESSAGE
    }),
});