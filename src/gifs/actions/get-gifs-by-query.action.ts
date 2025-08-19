import { giphyApi } from "../api/giphy.api";
import { Gif, GiphyGif, GiphyResponse } from "../interfaces";

export const getGifsByQuery = async (query: string): Promise<Gif[]> => {
    const { data } = await giphyApi<GiphyResponse>(`/search`, {
        params: {
            q: query,
            offset: 0,
            limit: 5,
        },
    });
    return data.data.map((g: GiphyGif) => ({
        id: g.id,
        title: g.title,
        url: g.images?.original?.url,
        width: Number(g.images?.original?.width),
        height: Number(g.images?.original?.height),
    }));
};
