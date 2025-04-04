import { useEffect, useState } from "react";
import {
  ITicketAdmin,
  ITicketAssignee,
  ITicketReporter,
  ITicketStatus,
} from "@/interfaces/ticket";
import { TicketsTable } from "@/components/TicketsTable";
import { Download } from "lucide-react";
import { useAppSelector } from "@/hooks";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

export function Table() {
  const assignedTicket = useAppSelector((state) => state.assignedTicket);
  const reportedTicket = useAppSelector((state) => state.reportedTicket);
  const adminTicket = useAppSelector((state) => state.adminTicket);
  const { activeOrgRole } = useAppSelector((state) => state.activeOrg);
  const [tickets, setTickets] = useState<
    ITicketAssignee[] | ITicketReporter[] | ITicketAdmin[]
  >([]);
  const [searchParams] = useSearchParams();
  const params = useParams();
  const status = searchParams.get("status") as ITicketStatus;
  const navigate = useNavigate();

  // const handleStatusChange = (ticketId: string, newStatus: ITicketStatus) => {
  //   setTickets((prevTickets) =>
  //     prevTickets.map((ticket) =>
  //       ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
  //     )
  //   );
  // };

  useEffect(() => {
    if (params.reported === "assigned") {
      if (assignedTicket === null || activeOrgRole === null) {
        navigate("/");
        return;
      }
      if (status === null) {
        setTickets(assignedTicket);
      } else {
        setTickets(assignedTicket.filter((ticket) => ticket.status === status));
      }
    } else if (params.reported === "reported") {
      if (reportedTicket === null) {
        navigate("/");
        return;
      } else if (status === null) {
        setTickets(reportedTicket);
      } else {
        setTickets(reportedTicket.filter((ticket) => ticket.status === status));
      }
    } else {
      if (activeOrgRole === "ADMIN") {
        if (adminTicket === null) {
          navigate("/");
          return;
        } else if (status === null) {
          setTickets(adminTicket);
        } else {
          setTickets(adminTicket.filter((ticket) => ticket.status === status));
        }
      }
    }
  }, [
    searchParams,
    params,
    assignedTicket,
    reportedTicket,
    adminTicket,
    navigate,
    status,
    activeOrgRole,
  ]);

  return (
    <div>
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="space-y-2">
          <div className="flex items-center">
            <h1 className="text-4xl font-bold tracking-tight text-blue-100">
              Ticket Management
            </h1>
            <Download className="h-10 w-10 text-blue-400 ml-2 opacity-70 hover:opacity-100 transition-opacity duration-200 p-2" />
          </div>
          <p className="text-lg text-blue-300">
            Manage and track support tickets efficiently
          </p>
        </div>

        <div>
          {params.reported === "assigned" && activeOrgRole === "ENGINEER" && (
            <TicketsTable
              data={tickets as ITicketAssignee[]}
              role={activeOrgRole}
              type="ticket"
              ticketType={params.reported}
              // onStatusChange={handleStatusChange}
            />
          )}
          {params.reported === "reported" && (
            <TicketsTable
              data={tickets as ITicketReporter[]}
              role={activeOrgRole}
              type="ticket"
              ticketType={params.reported}
              // onStatusChange={handleStatusChange}
            />
          )}
          {params.reported === "all" && activeOrgRole === "ADMIN" && (
            <TicketsTable
              data={tickets as ITicketAdmin[]}
              role={activeOrgRole}
              type="ticket"
              ticketType={params.reported}
              // onStatusChange={handleStatusChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}
