import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import { Button } from "./button";

type InputProps = React.ComponentProps<"input"> & {
    onClear?: () => void;
};

const SearchInput = ({ className, onClear, ...props }: InputProps) => {
    const classNames = cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "pl-8",
        className
    );

    return (
        <div className="relative flex items-center gap-2">
            <div className="absolute inset-y-0 left-2 flex items-center">
                <Search className={cn("w-4 h-4", props.disabled && "text-muted-foreground")} />
            </div>
            <input
                type="text"
                data-slot="input"
                className={classNames}
                {...props}
            />
            {props.value && <Button onClick={onClear} variant="ghost">
                <X />
                <span>Clear</span>
            </Button>}
        </div>
    );
};

export { SearchInput };

