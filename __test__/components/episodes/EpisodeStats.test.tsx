import { render, screen } from "@testing-library/react";
import EpisodeStats from "@/components/episodes/EpisodeStats/EpisodeStats";

jest.mock("@/hooks/useCharacterSelectionContext");
jest.mock("@/hooks/episodes/useEpisodeComparison");

const mockCharacterContext = require("@/hooks/useCharacterSelectionContext").useCharacterSelectionContext as jest.Mock;
const mockEpisodeComparison = require("@/hooks/episodes/useEpisodeComparison").useEpisodeComparison as jest.Mock;

describe("EpisodeStats", () => {
  const mockCharacters = { character1: { name: "Rick" }, character2: { name: "Morty" } };

  beforeEach(() => jest.clearAllMocks());

  it("shows empty state when no characters selected", () => {
    mockCharacterContext.mockReturnValue({ character1: null, character2: null });
    mockEpisodeComparison.mockReturnValue({ character1Only: [], character2Only: [], shared: [], isLoading: false });

    render(<EpisodeStats />);
    expect(screen.queryByText("Estadísticas de Episodios")).not.toBeInTheDocument();
    expect(screen.getByText("¡Selecciona dos personajes para comparar sus episodios!")).toBeInTheDocument();
  });

  it("shows stats when characters selected", () => {
    mockCharacterContext.mockReturnValue(mockCharacters);
    mockEpisodeComparison.mockReturnValue({ character1Only: [1], character2Only: [2], shared: [3], isLoading: false });

    render(<EpisodeStats />);
    expect(screen.getByText("Estadísticas de Episodios")).toBeInTheDocument();
    expect(screen.getByText("Total de Rick")).toBeInTheDocument();
  });

  it("calculates stats correctly", () => {
    mockCharacterContext.mockReturnValue(mockCharacters);
    mockEpisodeComparison.mockReturnValue({ character1Only: [1, 2], character2Only: [3], shared: [4, 5], isLoading: false });

    render(<EpisodeStats />);
    expect(screen.getByText("4")).toBeInTheDocument(); 
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("50%")).toBeInTheDocument();
  });
});
