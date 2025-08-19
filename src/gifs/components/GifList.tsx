import { Gif } from "../interfaces";
import { GifItem } from "./";

interface Props {
    gifs: Gif[];
}

export const GifList = ({ gifs }: Props) => {
    return (
        <div className="gifs-container">
            {gifs.map((gif) => (
                <GifItem key={gif.id} gif={gif} />
            ))}
        </div>
    );
};
