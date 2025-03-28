import { Moon, MoonStar, Sun, SunDim, SunMedium, Sunset } from "lucide-react"
import { ReactNode } from "react"
import { TableCell } from "../ui/table"

interface DynamicTimeOfDayProps {
    value: string
}

export default function DynamicTimeOfDay({ value }: DynamicTimeOfDayProps) {
    switch (value) {
        case "morning":
            return <IconValueWrapper>
                <Sun size={16} /> Morning
            </IconValueWrapper>
        case "noon":
            return <IconValueWrapper>
                <SunMedium size={16} /> Noon
            </IconValueWrapper>
        case "afternoon":
            return <IconValueWrapper>
                <SunDim size={16} /> Afternoon
            </IconValueWrapper>
        case "evening":
            return <IconValueWrapper>
                <Sunset size={16} /> Evening
            </IconValueWrapper>
        case "night":
            return <IconValueWrapper>
                <MoonStar size={16} /> Night
            </IconValueWrapper>
        case "latenight":
            return <IconValueWrapper>
                <Moon size={16} /> Late Night
            </IconValueWrapper>
        default:
            return <div>{value}</div>
    }
}

interface IconValueWrapperProps {
    children: ReactNode;
}

function IconValueWrapper({ children }: IconValueWrapperProps) {
    return <TableCell className="w-[200px]">
        <div className="flex items-center justify-center gap-2">{children}</div>
    </TableCell>
}