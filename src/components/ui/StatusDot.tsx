import { StatusEnum } from "@/types/characters";

export const statusColorMap: Record<StatusEnum, string> = {
  [StatusEnum.Alive]: "bg-green-500",
  [StatusEnum.Dead]: "bg-red-500",
  [StatusEnum.Unknown]: "bg-gray-500",
};

export default function StatusDot({ status }: { status: string }) {
  return <div className={`w-2 h-2 rounded-full ${statusColorMap[status as StatusEnum]}`} />;
}
