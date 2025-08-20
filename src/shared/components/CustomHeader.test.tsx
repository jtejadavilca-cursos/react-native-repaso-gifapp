import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { CustomHeader } from "./CustomHeader";

describe("CustomHeader", () => {
    const testTitle = "Title test";
    test("Should render component properly", () => {
        const { container } = render(<CustomHeader title={testTitle} />);
        expect(container).toMatchSnapshot();
    });

    test("Should not render a title - Way 1", () => {
        render(<CustomHeader title={testTitle} />);

        expect(screen.getByRole("heading").innerHTML).toContain(testTitle);
        expect(screen.queryByTestId("description")).toBeNull();
    });

    test("Should not render a title - Way 2", () => {
        const { container } = render(<CustomHeader title={testTitle} />);

        const divElement = container.querySelector(".content-center");
        const h1 = divElement?.querySelector("h1");
        expect(h1?.innerHTML).toBe(testTitle);
        expect(container.innerHTML).toContain(testTitle);

        const p = divElement?.querySelector("p");
        expect(p).toBeNull();
    });

    test("Should render a title", () => {
        const descriptionText = "Test description";
        render(<CustomHeader title={testTitle} description={descriptionText} />);

        expect(screen.getByRole("heading").innerHTML).toContain(testTitle);
        expect(screen.getByText(descriptionText)).toBeDefined();
        expect(screen.getByRole("paragraph")).toBeDefined();
        expect(screen.queryByTestId("description")).toBeDefined();
        expect(screen.getByTestId("description").innerHTML).toContain(descriptionText);
    });
});
