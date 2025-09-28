import SearchInput from "@/components/ui/SearchInput";
import { render, screen, fireEvent } from "@testing-library/react";

const mockOnSearch = jest.fn();

describe("SearchInput", () => {
  it("renders with placeholder", () => {
    render(<SearchInput value="" onSearch={mockOnSearch} />);
    expect(screen.getByPlaceholderText(/buscar personajes.../i)).toBeInTheDocument();
  });

  it("calls onSearch when typing", () => {
    render(<SearchInput value="" onSearch={mockOnSearch} />);
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "Rick" } });
    expect(mockOnSearch).toHaveBeenCalled();
  });
});