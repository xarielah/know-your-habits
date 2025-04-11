import { SearchInput } from "@/components/ui/search-input";

interface SearchHabitsProps {
    text: string;
    setText: (text: string) => void;
    disabled: boolean
}

export default function SearchHabits({ text, setText, disabled }: SearchHabitsProps) {
    return (
        <div className="flex items-center gap-2">
            <SearchInput disabled={disabled} value={text} onChange={e => setText(e.target.value)} onClear={() => setText("")} placeholder="Search your habits" />
        </div>
    )
}