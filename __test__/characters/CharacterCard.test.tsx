import { fireEvent, render, screen } from "@testing-library/react";
import CharacterCard from "@/components/characters/CharacterCard";
import { CharacterType } from "@/types/characters";

const mockCharacter: CharacterType = {
  id: 1,
  name: "Rick Sanchez",
  status: "Alive",
  species: "Human",
  type: "",
  gender: "Male",
  origin: { name: "Earth", url: "" },
  location: { name: "Earth", url: "" },
  image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  episode: [],
  url: "",
  created: "",
};

const mockOnSelect = jest.fn();

describe("CharacterCard", () => {
  it("renders character name and status", () => {
    render(<CharacterCard character={mockCharacter} onSelect={mockOnSelect} />);
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Alive - Human")).toBeInTheDocument();
  });

  it("calls onSelect when clicked", () => {
    render(<CharacterCard character={mockCharacter} onSelect={mockOnSelect} />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockOnSelect).toHaveBeenCalled();
  });

  it("renders character image with correct alt text", () => {
    render(<CharacterCard character={mockCharacter} onSelect={mockOnSelect} />);
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("alt", "Rick Sanchez");
  });
});
