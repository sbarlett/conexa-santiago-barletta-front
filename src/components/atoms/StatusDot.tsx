import { StatusEnum } from "@/types/characters";
import { statusColorMap } from "@/utils/translation";

export default function StatusDot({ status }: { status: StatusEnum }) {
  return <div className={`w-2 h-2 rounded-full ${statusColorMap[status]}`} />;
}
