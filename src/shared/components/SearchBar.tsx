import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";

interface Props {
    placeholder?: string;
    onQuery: (query: string) => void;
}

export const SearchBar = ({ placeholder = "Buscar", onQuery }: Props) => {
    const [query, setQuery] = useState("");

    useEffect(() => {
        //debouncer effect
        const timeoutId = setTimeout(() => {
            onQuery(query);
            setQuery("");
        }, 700);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [query, onQuery]);

    const handleSearch = () => {
        onQuery(query);
        setQuery("");
    };

    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => setQuery(event.target.value);

    const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };
    return (
        <div className="search-container">
            <input
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={handleOnChange}
                onKeyDown={handleEnter}
            />
            <button onClick={handleSearch}>Buscar</button>
        </div>
    );
};
