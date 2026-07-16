import background from "/src/assets/background.jpg"

export function AuthBackground() {
    return (
        <img
        src={background}
        alt="background"
        className="w-full h-full rounded-sm object-cover brightness-75"
        />
    )
}