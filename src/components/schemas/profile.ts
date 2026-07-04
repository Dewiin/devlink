import z from "zod"

const NAME_LEN_MINIMUM = 1
const NAME_LEN_MAXIMUM = 50
const BIO_LEN_MAXIMUM = 500
const PASS_LEN_MINIMUM = 8
const PASS_LEN_MAXIMUM = 512
const PRINTABLE_UNICODE = /^[\P{Cc}\P{Cn}\P{Cs}]+$/gu // allow only, printable (unicode) characters; https://stackoverflow.com/a/12054775
const PRINTABLE_MESSAGE = "can only contain printable characters."

export const profileSchema = z.object({
    displayName: z.string().trim().min(NAME_LEN_MINIMUM, {
        error: "Name must have a character."
    }).max(NAME_LEN_MAXIMUM, {
        error: "Name is limited to " + NAME_LEN_MAXIMUM + " characters."
    }),
    bio: z.string().trim().max(BIO_LEN_MAXIMUM, {
        error: "Bio is limited to " + BIO_LEN_MAXIMUM + " characters."
    })
});

export const passwordSchema = z.object({
    newPassword: z.string().min(PASS_LEN_MINIMUM, {
        error: "Password must be at least " + PASS_LEN_MINIMUM + " characters."
    }). max(PASS_LEN_MAXIMUM, {
        error: "Password has a " + PASS_LEN_MAXIMUM + " character limit."
    }).regex(PRINTABLE_UNICODE, { 
        error: "Password " + PRINTABLE_MESSAGE
    }),
})

