import { Breakpoint } from "@/hooks/useBreakpoint";
import { StatusEnum } from "@/types/characters";

export const getEstimatedRowHeight = (breakpoint: Breakpoint) => {
  switch (breakpoint) {
    case Breakpoint.Mobile:
      return 240;
    case Breakpoint.Tablet:
      return 230;
    case Breakpoint.Desktop:
    default:
      return 220;
  }
};

export const getItemsPerRow = (breakpoint: Breakpoint) => {
  switch (breakpoint) {
    case Breakpoint.Mobile:
      return 2;
    case Breakpoint.Tablet:
      return 3;
    case Breakpoint.Desktop:
    default:
      return 3;
  }
};

export const getGridColumnsClass = (breakpoint: Breakpoint) => {
  switch (breakpoint) {
    case Breakpoint.Mobile:
      return "grid-cols-2";
    case Breakpoint.Tablet:
      return "grid-cols-3";
    case Breakpoint.Desktop:
    default:
      return "grid-cols-3";
  }
};

export const statusColorMap: Record<StatusEnum, string> = {
  [StatusEnum.Alive]: "bg-green-500",
  [StatusEnum.Dead]: "bg-red-500",
  [StatusEnum.Unknown]: "bg-gray-500",
};


export const extractEpisodeId = (url: string) => +url.split("/").pop()!;
