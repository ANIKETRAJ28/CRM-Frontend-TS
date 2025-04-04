import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ITicketStatus } from "@/interfaces/ticket";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/hooks";
import { updateAssignedTicket } from "@/store/slices/assignedTicketSlice";

interface TicketStatusCellProps {
  id: string;
  status: ITicketStatus;
}

const statusColors: Record<ITicketStatus, string> = {
  OPEN: "bg-blue-500/20 text-blue-500 hover:bg-blue-500/30",
  CLOSED: "bg-gray-500/20 text-gray-500 hover:bg-gray-500/30",
  PROGRESS: "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30",
  RESOLVED: "bg-green-500/20 text-green-500 hover:bg-green-500/30",
  HOLD: "bg-purple-500/20 text-purple-500 hover:bg-purple-500/30",
};

const statusLabels: Record<ITicketStatus, string> = {
  OPEN: "Open",
  CLOSED: "Closed",
  PROGRESS: "In Progress",
  RESOLVED: "Resolved",
  HOLD: "On Hold",
};

export function TicketStatusCell({ id, status }: TicketStatusCellProps) {
  const statuses: ITicketStatus[] = [
    "OPEN",
    "PROGRESS",
    "RESOLVED",
    "CLOSED",
    "HOLD",
  ];

  const dispatch = useAppDispatch();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "h-8 w-[120px] justify-between transition-all duration-200",
            statusColors[status]
          )}
        >
          {statusLabels[status]}
          <ChevronsUpDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[160px]"
      >
        {statuses.map((s) => (
          <DropdownMenuItem
            key={s}
            onClick={async () => {
              if (s === status) return;
              await dispatch(updateAssignedTicket({ id, status: s }));
            }}
            className={cn(
              "justify-between transition-colors duration-200",
              status === s && "bg-accent",
              statusColors[s]
            )}
          >
            {statusLabels[s]}
            {status === s && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
