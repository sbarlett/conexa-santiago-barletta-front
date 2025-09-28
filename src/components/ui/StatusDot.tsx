import { StatusEnum } from "@/types/characters";
import { statusColorMap } from "@/utils";

export default function StatusDot({ status }: { status: string }) {
  return <div className={`w-2 h-2 rounded-full ${statusColorMap[status as StatusEnum]}`} />;
}
