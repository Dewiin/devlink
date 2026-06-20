import z from "zod"

export const messageSchema = z.object({
    content: z.string().trim().min(1, {
        error: "Message must be at least a character."
    }).max(500, {
        error: "Message has a character limit of 500."
    })
});