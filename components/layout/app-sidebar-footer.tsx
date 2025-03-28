import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function AppSidebarFooter() {
    return (
        <section className="flex items-center gap-2">
            <Avatar className="w-10 h-10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AA</AvatarFallback>
            </Avatar>
            <span>Ariel Aharon</span>
        </section>
    )
}