import { GifList, PreviousSearches } from "./gifs/components";
import { CustomHeader, SearchBar } from "./shared/components";
import { useState } from "react";
import { getGifsByQuery } from "./gifs/actions";
import { Gif } from "./gifs/interfaces";

export const GifsApp = () => {
    const [gifs, setGifs] = useState<Gif[]>([]);
    const [previousTerms, setPreviousTerms] = useState<string[]>([]);

    const handleTermClicked = (term: string) => {
        console.log(term);
    };

    const handleSearch = async (query: string) => {
        if (query.trim() === "") return;
        //const term = query.replace(/ /g, "").toLocaleUpperCase();
        const term = query.toLocaleUpperCase();
        if (!previousTerms.includes(term)) {
            console.log("including...");
            setPreviousTerms([term, ...previousTerms].slice(0, 8));

            setGifs(await getGifsByQuery(term));
        }
    };

    return (
        <>
            {/* Header */}
            <CustomHeader title="Buscador de Gifs" description="Descubre y comparte el gif perfecto" />

            {/* Search */}
            <SearchBar placeholder="Buscar gifs" onQuery={handleSearch} />

            {/* Búsquedas previas */}
            <PreviousSearches searches={previousTerms} onLabelClick={handleTermClicked} />

            {/* Gifs */}
            <GifList gifs={gifs} />
        </>
    );
};
