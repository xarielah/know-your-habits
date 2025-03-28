import { Equal, Minus, Plus } from "lucide-react";
import { ReactNode } from "react";
import { TableCell } from "../ui/table";

interface DynamicTypeProps {
    value: string;
}

export default function DynamicType({ value }: DynamicTypeProps) {
    switch (value) {
        case "positive":
            return <TableCell className="bg-green-200/20 w-[150px]">
                <IconValueWrapper>
                    <Plus />
                </IconValueWrapper>
            </TableCell>
        case "negative":
            return <TableCell className="bg-red-200/20 w-[150px]">
                <IconValueWrapper>
                    <Minus />
                </IconValueWrapper>
            </TableCell>
        case "neutral":
            return <TableCell className="bg-cyan-200/20 w-[150px]">
                <IconValueWrapper>
                    <Equal />
                </IconValueWrapper>
            </TableCell>
        default:
            return <div>{value}</div>
    }
}

interface IconValueWrapperProps {
    children: ReactNode;
    className?: string;
}

export function IconValueWrapper({ children, className = '' }: IconValueWrapperProps) {
    return <div className={`flex items-center justify-center ${className} text-gray-600`}>{children}</div>
}