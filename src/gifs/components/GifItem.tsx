import { Gif } from "../interfaces";

interface Props {
    gif: Gif;
}

export const GifItem = ({ gif }: Props) => {
    return (
        <div className="gif-card">
            <img src={gif.url} alt={gif.title} />
            <h3>{gif.title}</h3>
            <p>
                {gif.width}x{gif.height} (1.5mb)
            </p>
        </div>
    );
};
