import { useRef, useState } from "react";
import { Gif } from "../interfaces";
import { getGifsByQuery } from "../actions";

export const useGifs = () => {
    const [gifs, setGifs] = useState<Gif[]>([]);
    const [previousTerms, setPreviousTerms] = useState<string[]>([]);

    const gifsCache = useRef<Record<string, Gif[]>>({});

    const handleTermClicked = async (term: string) => {
        setGifs(gifsCache.current[term] || []);
    };

    const handleSearch = async (query: string) => {
        let term = query.trim();
        if (term === "") return;

        term = term.trim().toLocaleUpperCase();
        if (!previousTerms.includes(term)) {
            setPreviousTerms((prev) => [term, ...prev].slice(0, 8));
        }

        let gifsResult = gifsCache.current[term];
        if (!gifsResult) {
            gifsResult = await getGifsByQuery(term);
            gifsCache.current[term] = gifsResult;
        }
        setGifs(gifsResult);
    };
    return {
        gifs,
        previousTerms,

        handleTermClicked,
        handleSearch,
    };
};
