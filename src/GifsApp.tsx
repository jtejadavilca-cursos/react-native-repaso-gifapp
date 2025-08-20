import { GifList, PreviousSearches } from "./gifs/components";
import { useGifs } from "./gifs/hooks/useGifs";
import { CustomHeader, SearchBar } from "./shared/components";

export const GifsApp = () => {
    const { gifs, previousTerms, handleSearch, handleTermClicked } = useGifs();

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
