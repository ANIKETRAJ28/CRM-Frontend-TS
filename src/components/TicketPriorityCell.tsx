import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ITicketPriority } from "@/interfaces/ticket";
import { cn } from "@/lib/utils";
import { RefObject } from "react";

interface ITicketPriorityCellProps {
  priority: ITicketPriority;
  onPriorityChange: (priority: ITicketPriority) => void;
  dropdownRef?: RefObject<HTMLDivElement | null>;
}

const priorityColors: Record<ITicketPriority, string> = {
  LOW: "bg-blue-400 hover:bg-blue-500",
  MEDIUM: "bg-yellow-400 hover:bg-yellow-500",
  HIGH: "bg-orange-400 hover:bg-orange-500",
  URGENT: "bg-red-400 hover:bg-red-500",
};

const priorityLabels: Record<ITicketPriority, string> = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
  URGENT: "Urgent",
};

export function TicketPriorityCell({
  priority,
  onPriorityChange,
  dropdownRef,
}: ITicketPriorityCellProps) {
  const priorities: ITicketPriority[] = ["LOW", "MEDIUM", "HIGH", "URGENT"];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className={cn(
            "h-8 w-[120px] justify-between transition-all duration-200 hover:bg-blue-700",
            priorityColors[priority]
          )}
        >
          {priorityLabels[priority]}
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        ref={dropdownRef}
        align="end"
        className="w-[160px] bg-black border-black"
      >
        {priorities.map((p) => (
          <DropdownMenuItem
            key={p}
            onClick={() => onPriorityChange(p)}
            className={cn(
              "justify-between transition-colors duration-200",
              priority === p && "bg-accent",
              priorityColors[p]
            )}
          >
            {priorityLabels[p]}
            {priority === p && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
