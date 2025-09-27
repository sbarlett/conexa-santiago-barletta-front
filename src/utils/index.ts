import { StatusEnum } from "@/types/characters";

type Breakpoint = "mobile" | "tablet" | "desktop";

export const getEstimatedRowHeight = (breakpoint: Breakpoint) => {
  switch (breakpoint) {
    case "mobile":
      return 240;
    case "tablet":
      return 230;
    case "desktop":
    default:
      return 220;
  }
};

export const getItemsPerRow = (breakpoint: Breakpoint) => {
  switch (breakpoint) {
    case "mobile":
      return 1;
    case "tablet":
      return 2;
    case "desktop":
    default:
      return 3;
  }
};

export const getGridColumnsClass = (breakpoint: Breakpoint) => {
  switch (breakpoint) {
    case "mobile":
      return "grid-cols-1";
    case "tablet":
      return "grid-cols-2";
    case "desktop":
    default:
      return "grid-cols-3";
  }
};

export const statusColorMap: Record<StatusEnum, string> = {
  [StatusEnum.Alive]: "bg-green-500",
  [StatusEnum.Dead]: "bg-red-500",
  [StatusEnum.Unknown]: "bg-gray-500",
};
