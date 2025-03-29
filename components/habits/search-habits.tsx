import { SearchInput } from "../ui/search-input";

interface SearchHabitsProps {
    text: string;
    setText: (text: string) => void;
}

export default function SearchHabits({ text, setText }: SearchHabitsProps) {
    return (
        <div className="flex items-center gap-2">
            <SearchInput value={text} onChange={e => setText(e.target.value)} onClear={() => setText("")} placeholder="Search your habits" />
        </div>
    )
}