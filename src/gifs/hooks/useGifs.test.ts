import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { useGifs } from "./useGifs";
import { getGifsByQuery } from "../actions";
import { Gif } from "../interfaces";

const mockGif: Gif = {
    id: "1",
    title: "gif mock",
    url: "https://gif.mock",
    width: 20,
    height: 20,
};
vi.mock("../actions", () => ({
    getGifsByQuery: vi.fn(() => [mockGif]),
}));
describe("useGifs", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("Should initialize with default values", () => {
        const { result } = renderHook(() => useGifs());

        expect(result.current.gifs).toStrictEqual([]);
        expect(result.current.previousTerms).toStrictEqual([]);
        expect(result.current.handleSearch).toBeDefined();
        expect(result.current.handleTermClicked).toBeDefined();
    });

    test.each([
        { query: "test", term: "TEST" },
        { query: "test", term: "TEST" },
        { query: "  tESt   ", term: "TEST" },
    ])("Should handle search when trigger it", async ({ query, term }) => {
        const { result } = renderHook(() => useGifs());

        await act(async () => await result.current.handleSearch(query));

        expect(result.current.previousTerms).toStrictEqual([term]);
        expect(getGifsByQuery).toHaveBeenCalledOnce();
    });

    test("Should get gifs from cache when term is already searched", async () => {
        const { result } = renderHook(() => useGifs());
        const query = "TEST";

        await act(async () => await result.current.handleSearch(query));
        await act(async () => await result.current.handleSearch(query));

        expect(result.current.previousTerms).toStrictEqual([query]);
        expect(result.current.gifs).toStrictEqual([mockGif]);
        expect(getGifsByQuery).toHaveBeenCalledOnce();
    });

    test("Should get gifs from api if term doesn't exist in cache", async () => {
        const { result } = renderHook(() => useGifs());
        const query1 = "TEST1";
        const query2 = "TEST2";

        await act(async () => await result.current.handleSearch(query1));
        await act(async () => await result.current.handleSearch(query2));

        expect(result.current.previousTerms).toStrictEqual([query2, query1]);
        expect(result.current.gifs).toStrictEqual([mockGif]);
        expect(getGifsByQuery).toHaveBeenCalledTimes(2);
    });
});
