import { render, screen } from "@testing-library/react";
import EmptyCard from "@/components/ui/EmptyCard";

describe("EmptyCard", () => {
  it("renders loading spinner when loading is true", () => {
    const { container } = render(<EmptyCard loading />);
    const spinner = container.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
    expect(container.querySelector("p")).not.toBeInTheDocument();
  });

  it("renders text when text prop is provided", () => {
    const { container } = render(<EmptyCard text="No hay personajes" />);
    expect(screen.getByText("No hay personajes")).toBeInTheDocument();
    expect(container.querySelector(".animate-spin")).not.toBeInTheDocument();
  });
});