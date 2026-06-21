import type { Message } from "@/components/types/Message";

export function isNewSender(
    current: Message,
    previous?: Message
) {
    if (!previous) return true;

    const currentDate = new Date(current.createdAt);
    const previousDate = new Date(previous.createdAt);

    const isDifferentDay = currentDate.toDateString() !== previousDate.toDateString();

    const isDifferentSender = current.sender.id !== previous.sender.id;

    return isDifferentDay || isDifferentSender;
}