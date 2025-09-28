import { render, screen } from "@testing-library/react";
import CharacterSelector from "@/components/characters/CharacterPreview/CharacterSelector";
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

describe("CharacterSelector", () => {
  it("renders placeholder when no character selected", () => {
    render(<CharacterSelector character={null} label="Personaje #1" />);
    expect(screen.getByText("Personaje #1")).toBeInTheDocument();
    expect(screen.getByText("Seleccionar personaje")).toBeInTheDocument();
  });

  it("renders selected character", () => {
    render(<CharacterSelector character={mockCharacter} label="Personaje #1" />);
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("alt", "Rick Sanchez");
  });
});
