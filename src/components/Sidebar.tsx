import { useState } from "react";
import { ChevronLeft, ChevronRight, Building2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { IUserOrg } from "@/interfaces/userOrg";
import { useAppSelector, useAppDispatch } from "@/hooks/index";
import { setActiveOrg } from "@/store/slices/activeOrgSlice";
import { removeAdminTicket } from "@/store/slices/adminTicketSlice";
import { removeAssignedTicket } from "@/store/slices/assignedTicketSlice";
import { removeReportedTicket } from "@/store/slices/reportedTicketSlice";
import { removeOrgMember } from "@/store/slices/orgMemberSlice";
import { removeToggleActiveState } from "@/store/slices/acticeToggleSlice"; // corrected import path
import { useNavigate } from "react-router-dom";

export function Sidebar({ setOpen }: { setOpen: (open: boolean) => void }) {
  const [expanded, setExpanded] = useState(true);
  const [hoveredOrg, setHoveredOrg] = useState<string | null>(null);
  const userOrgs = useAppSelector((state) => state.org);
  const activeOrgId = useAppSelector((state) => state.activeOrg.activeOrgId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleOrgSwitch(userOrg: IUserOrg) {
    if (activeOrgId === userOrg.org.id) return;
    dispatch(removeReportedTicket());
    dispatch(removeAssignedTicket());
    dispatch(removeAdminTicket());
    dispatch(removeOrgMember());
    dispatch(removeToggleActiveState());
    dispatch(setActiveOrg({ orgId: userOrg.org.id, role: userOrg.role }));
    navigate("/org");
  }

  return (
    <div
      className={cn(
        "sticky text-white transition-all duration-300 ease-in-out flex flex-col",
        expanded ? "w-64" : "w-20"
      )}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="absolute left-6 top-3 bg-blue-500 rounded-full p-1.5 hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 hover-pulse z-10"
      >
        {expanded ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </button>
      <div className="flex-1 flex flex-col min-h-0 p-2 sm:p-4">
        <div className="mt-8 flex-1 flex flex-col min-h-0">
          <div
            className={`flex items-center ${
              !expanded ? "flex-col gap-4" : ""
            } justify-between mb-4 px-2`}
          >
            <h2 className="text-sm font-semibold text-slate-400 shrink-0">
              {expanded ? "ORGANIZATIONS" : "ORGS"}
            </h2>
            <Plus
              onClick={() => setOpen(true)}
              className="hover:bg-blue-700 transition-all duration-300 rounded-sm p-[2px]"
            />
          </div>
          <ScrollArea className="flex-1 h-[calc(100vh-200px)]">
            <div className="space-y-1">
              {userOrgs.orgs &&
                userOrgs.orgs.map((userOrg: IUserOrg) => (
                  <TooltipProvider key={userOrg.org.id}>
                    <Tooltip
                      delayDuration={100}
                      open={!expanded && hoveredOrg === userOrg.org.id}
                    >
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => handleOrgSwitch(userOrg)}
                          className={cn(
                            `w-full flex items-center space-x-3 p-2 rounded-lg transition-all duration-300 ${
                              activeOrgId === userOrg.org.id &&
                              "bg-gradient-to-r from-slate-800 to-slate-800/50"
                            }`,
                            "hover:bg-gradient-to-r hover:from-slate-800 hover:to-slate-800/50",
                            "relative group",
                            hoveredOrg === userOrg.org.id &&
                              "bg-gradient-to-r from-slate-800 to-slate-800/50"
                          )}
                          onMouseEnter={() => setHoveredOrg(userOrg.org.id)}
                          onMouseLeave={() => setHoveredOrg(null)}
                        >
                          <div
                            className={cn(
                              "rounded-full p-2 transition-all duration-300",
                              hoveredOrg === userOrg.org.id ||
                                activeOrgId === userOrg.org.id
                                ? "bg-blue-500"
                                : "bg-slate-800"
                            )}
                          >
                            <Building2 className="h-4 w-4 text-white" />
                          </div>
                          {expanded && (
                            <span className="truncate text-left animate-slide-in">
                              {userOrg.org.name}
                            </span>
                          )}
                        </button>
                      </TooltipTrigger>
                      {!expanded && (
                        <TooltipContent
                          side="right"
                          className="animate-fade-in bg-blue-500 border-none text-white"
                        >
                          {userOrg.org.name}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
