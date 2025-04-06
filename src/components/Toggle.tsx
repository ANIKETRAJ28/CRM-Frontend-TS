import { ArrowUpCircle, FileText, Users } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
import { toggleActiveState } from "@/store/slices/acticeToggleSlice";
import { useAppDispatch, useAppSelector } from "@/hooks";

export function Toggle() {
  const dispatch = useAppDispatch();
  const { activeOrgRole } = useAppSelector((state) => state.activeOrg);
  const { activeToggle } = useAppSelector((state) => state.activeToggleSlice);

  return (
    <div>
      <ToggleGroup
        type="single"
        defaultValue={activeToggle}
        className="flex size-[100%] sm:size-fit"
      >
        <ToggleGroupItem
          value="reported"
          className="flex items-center gap-2 data-[state=on]:bg-blue-500 data-[state=on]:text-primary-foreground data-[state=off]:bg-accent"
          onClick={() => dispatch(toggleActiveState("reported"))}
        >
          <ArrowUpCircle className="h-4 w-4" />
          <span className="text-xs">Reported</span>
        </ToggleGroupItem>
        <ToggleGroupItem
          value={`${activeOrgRole === "ADMIN" ? "all" : "assigned"}`}
          className="flex items-center gap-2 data-[state=on]:bg-blue-500 data-[state=on]:text-primary-foreground data-[state=off]:bg-accent"
          onClick={() =>
            dispatch(
              toggleActiveState(activeOrgRole === "ADMIN" ? "all" : "assigned")
            )
          }
        >
          <FileText className="h-4 w-4" />
          <span className="text-xs">
            {activeOrgRole === "ADMIN" ? "All Ticket" : "Assigned"}
          </span>
        </ToggleGroupItem>
        {activeOrgRole === "ADMIN" && (
          <ToggleGroupItem
            value="members"
            className="flex items-center gap-2 data-[state=on]:bg-blue-500 data-[state=on]:text-primary-foreground data-[state=off]:bg-accent"
            onClick={() => dispatch(toggleActiveState("members"))}
          >
            <Users className="h-4 w-4" />
            <span className="text-xs">Members</span>
          </ToggleGroupItem>
        )}
      </ToggleGroup>
    </div>
  );
}
