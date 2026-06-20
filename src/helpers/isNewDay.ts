export function isNewDay(
    currentDate: Date,
    previousDate?: Date
) {
    if(!previousDate) return true;

    const current = new Date(currentDate);
    const previous = new Date(previousDate);

    return (
        current.getFullYear() !== previous.getFullYear() ||
        current.getMonth() !== previous.getMonth() ||
        current.getDate() !== previous.getDate()
    );
}