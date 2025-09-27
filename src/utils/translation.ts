import { SpeciesEnum, StatusEnum } from "@/types/characters";

export const statusColorMap: Record<StatusEnum, string> = {
  [StatusEnum.Alive]: "bg-green-500",
  [StatusEnum.Dead]: "bg-red-500",
  [StatusEnum.Unknown]: "bg-gray-500",
};