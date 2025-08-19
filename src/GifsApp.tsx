import { GifList, PreviousSearches } from "./gifs/components";
import { CustomHeader, SearchBar } from "./shared/components";
import { mockGifs } from "./mock-data/gifs.mock";
import { useState } from "react";

export const GifsApp = () => {
    const [previousTerms, setPreviousTerms] = useState<string[]>([]);

    const handleTermClicked = (term: string) => {
        console.log(term);
    };

    const handleSearch = (query: string) => {
        if (query.trim() === "") return;
        const term = query.replace(/ /g, "").toLocaleUpperCase();
        if (!previousTerms.includes(term)) {
            console.log("including...");
            setPreviousTerms([term, ...previousTerms].slice(0, 8));
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
            <GifList gifs={mockGifs} />
        </>
    );
};
