import { useCallback, useContext, useEffect, useState } from "react";
import {
  ITicketAdmin,
  ITicketReporter,
  ITicketAssignee,
  ITicketStatus,
} from "@/interfaces/ticket";
import { StatusCard } from "@/components/StatusCard";
import { useAppDispatch, useAppSelector } from "@/hooks/index";
import { setAssignedTicket } from "@/store/slices/assignedTicketSlice";
import { Toggle } from "./Toggle";
import { setReportedTicket } from "@/store/slices/reportedTicketSlice";
import { useNavigate } from "react-router-dom";
import { setAdminTicket } from "@/store/slices/adminTicketSlice";
import { setOrgMember } from "@/store/slices/orgMemberSlice";
import { IUserOrgMember } from "@/interfaces/user";
import { TicketsTable } from "./TicketsTable";
import { SyncLoader } from "react-spinners";
import { Building2, FilePlus } from "lucide-react";
import { Button } from "./ui/button";
import { ticketContext } from "@/context/TicketContext";

export function TicketsCard() {
  const { activeOrgId, activeOrgRole } = useAppSelector(
    (state) => state.activeOrg
  );
  const { activeToggle } = useAppSelector((state) => state.activeToggleSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { setCreateTicket } = useContext(ticketContext);

  const assignedTicket = useAppSelector((state) => state.assignedTicket);
  const reportedTicket = useAppSelector((state) => state.reportedTicket);
  const adminTicket = useAppSelector((state) => state.adminTicket);
  const orgData = useAppSelector((state) => state.orgMember);

  const [tickets, setTickets] = useState<
    ITicketAdmin[] | ITicketAssignee[] | ITicketReporter[] | IUserOrgMember[]
  >([]);

  useEffect(() => {
    setTickets([]);
  }, [activeOrgId]);

  const fetchData = useCallback(async () => {
    if (activeOrgRole === "ADMIN") {
      if (activeToggle === "reported") {
        await dispatch(setReportedTicket());
      } else if (activeToggle === "all") {
        await dispatch(setAdminTicket());
      } else if (activeToggle === "members") {
        await dispatch(setOrgMember());
      } else {
        navigate("/");
      }
    } else if (activeOrgRole === "ENGINEER") {
      if (activeToggle === "reported") {
        await dispatch(setReportedTicket());
      } else if (activeToggle === "assigned") {
        await dispatch(setAssignedTicket());
      } else {
        navigate("/");
      }
    } else if (activeOrgRole === "USER") {
      await dispatch(setReportedTicket());
    }
  }, [activeOrgRole, activeToggle, dispatch, navigate]);

  useEffect(() => {
    if (!activeOrgId) return;
    if (activeOrgRole === "ADMIN") {
      if (activeToggle === "reported") {
        dispatch(setReportedTicket());
      } else if (activeToggle === "all") {
        dispatch(setAdminTicket());
      } else if (activeToggle === "members") {
        dispatch(setOrgMember());
      } else {
        navigate("/");
      }
    } else if (activeOrgRole === "ENGINEER") {
      if (activeToggle === "reported") {
        dispatch(setReportedTicket());
      } else if (activeToggle === "assigned") {
        dispatch(setAssignedTicket());
      } else {
        navigate("/");
      }
    } else if (activeOrgRole === "USER") {
      dispatch(setReportedTicket());
    }
  }, [
    activeOrgId,
    fetchData,
    activeOrgRole,
    activeToggle,
    dispatch,
    navigate,
    reportedTicket?.length,
  ]);

  async function buffer() {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(false);
  }

  useEffect(() => {
    buffer();
  }, [activeOrgId]);

  useEffect(() => {
    if (activeOrgRole === "ADMIN") {
      if (activeToggle === "reported") {
        setTickets(reportedTicket || []);
      } else if (activeToggle === "all") {
        setTickets(adminTicket || []);
      } else if (activeToggle === "members") {
        setTickets(orgData || []);
      }
    } else if (activeOrgRole === "ENGINEER") {
      if (activeToggle === "reported") {
        setTickets(reportedTicket || []);
      } else if (activeToggle === "assigned") {
        setTickets(assignedTicket || []);
      }
    } else if (activeOrgRole === "USER") {
      setTickets(reportedTicket || []);
    }
  }, [
    activeOrgRole,
    activeToggle,
    reportedTicket,
    adminTicket,
    assignedTicket,
    orgData,
  ]);

  const getStatusCount = (status: ITicketStatus) => {
    const filteredTickets = tickets.filter(
      (ticket): ticket is ITicketAdmin | ITicketAssignee | ITicketReporter =>
        "status" in ticket && ticket.status === status
    );
    return filteredTickets.length;
  };

  const statuses: ITicketStatus[] = [
    "OPEN",
    "PROGRESS",
    "RESOLVED",
    "CLOSED",
    "HOLD",
  ];

  return (
    <div
      className={`relative ${
        loading || !activeOrgId
          ? "w-full h-full flex items-center justify-center"
          : "pb-8"
      }`}
    >
      {loading ? (
        <SyncLoader
          size={15}
          color="#3b82f6"
        />
      ) : activeOrgId ? (
        <div className="max-w-7xl mx-auto">
          <div className="space-y-8">
            <div className="animate-fade-in">
              <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                Ticket Dashboard
              </h1>
              <p className="text-slate-400 mt-2">
                Monitor and manage your support tickets efficiently
              </p>
            </div>
            {activeOrgRole !== "USER" && <Toggle />}
            {activeToggle === "reported" && (
              <div>
                <Button
                  onClick={() => setCreateTicket(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <FilePlus /> <span>Add Ticket</span>
                </Button>
              </div>
            )}
            {activeToggle !== "members" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 animate-slide-up">
                <div
                  className="animate-fade-in lg:col-span-5"
                  style={{ animationDelay: "0ms" }}
                  onClick={() => navigate(`/org/tickets/${activeToggle}`)}
                >
                  <StatusCard
                    status="TOTAL"
                    count={tickets.length}
                    total={tickets.length}
                    className="h-full"
                  />
                </div>
                {statuses.map((status, index) => (
                  <div
                    key={status}
                    className="animate-fade-in"
                    style={{ animationDelay: `${(index + 1) * 100}ms` }}
                    onClick={() =>
                      navigate(`/org/tickets/${activeToggle}?status=${status}`)
                    }
                  >
                    <StatusCard
                      status={status}
                      count={getStatusCount(status)}
                      total={tickets.length}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <TicketsTable
                data={tickets as IUserOrgMember[]}
                role="ADMIN"
                type="members"
              />
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <Building2 className="text-gray-700 size-10 sm:size-20" />
          <span className="text-xs sm:text-xl text-gray-500">
            Please select an organization to view tickets.
          </span>
        </div>
      )}
    </div>
  );
}
