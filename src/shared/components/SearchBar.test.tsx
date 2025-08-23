import { describe, expect, test, vi } from "vitest";
import { SearchBar } from "./SearchBar";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe("SearchBar", () => {
    test("Should render searchbar correctly", () => {
        const { container } = render(<SearchBar onQuery={() => {}} />);

        expect(container).toMatchSnapshot();
        expect(screen.getByRole("textbox")).toBeDefined();
        expect(screen.getByRole("button")).toBeDefined();
        expect(screen.getByRole("button").innerHTML).contain("Buscar");
    });

    test("Should call onQuery with the correct value after 700ms", async () => {
        const termSearch = "test-input";
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery} />);

        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: termSearch } });

        // Mala práctica:
        // await new Promise((res) => setTimeout(res, 701));

        // Forma correcta:
        await waitFor(() => {
            expect(onQuery).toHaveBeenCalled();
        });

        expect(onQuery).toHaveBeenCalledWith(termSearch);
    });

    test("should call only once with the last value (debounce)", async () => {
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery} />);

        const input = screen.getByRole("textbox");
        fireEvent.change(input, { target: { value: "t" } });
        fireEvent.change(input, { target: { value: "te" } });

        await waitFor(() => {
            expect(onQuery).toHaveBeenCalledOnce();
        });

        expect(onQuery).toHaveBeenCalledWith("te");
        expect(onQuery).not.toHaveBeenCalledWith("t");
    });
});
