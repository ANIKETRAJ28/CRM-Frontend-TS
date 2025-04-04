import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ITicketAdmin,
  ITicketAssignee,
  ITicketReporter,
  ITicketStatus,
  // ITicketStatus,
} from "@/interfaces/ticket";
import { TicketStatusCell } from "./TicketStatusCell";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IOrgRole } from "@/interfaces/userOrg";
import { IUserOrgMember } from "@/interfaces/user";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { UserPlus2, X } from "lucide-react";
import { inviteUser } from "@/apis/userOrg";
import { toast } from "sonner";

type AdminTicketPayload = {
  data: ITicketAdmin[];
  role: "ADMIN" | null;
  type: "ticket";
  ticketType: "reported" | "assigned" | "all";
};

type AssigneeTicketPayload = {
  data: ITicketAssignee[];
  role: "ENGINEER" | null;
  type: "ticket";
  ticketType: "reported" | "assigned" | "all";
};

type ReporterTicketPayload = {
  data: ITicketReporter[];
  role: "USER" | "ENGINEER" | "ADMIN" | null;
  type: "ticket";
  ticketType: "reported" | "assigned" | "all";
};

type MembersPayload = {
  data: IUserOrgMember[];
  role: "ADMIN" | null;
  type: "members";
};

const getRoleBadgeColor = (role: IOrgRole) => {
  switch (role) {
    case "ADMIN":
      return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
    case "ENGINEER":
      return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
    case "USER":
      return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
  }
};

const priorityColors = {
  LOW: "text-blue-400",
  MEDIUM: "text-yellow-400",
  HIGH: "text-orange-400",
  URGENT: "text-red-400",
};

const priorityBackgrounds = {
  LOW: "bg-blue-400/20",
  MEDIUM: "bg-yellow-400/20",
  HIGH: "bg-orange-400/20",
  URGENT: "bg-red-400/30",
};

const statusColor = new Map<ITicketStatus, string>([
  ["OPEN", "bg-blue-500/20 text-blue-500 hover:bg-blue-500/30"],
  ["CLOSED", "bg-gray-500/20 text-gray-500 hover:bg-gray-500/30"],
  ["PROGRESS", "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30"],
  ["RESOLVED", "bg-green-500/20 text-green-500 hover:bg-green-500/30"],
  ["HOLD", "bg-purple-500/20 text-purple-500 hover:bg-purple-500/30"],
]);

export function TicketsTable({
  type,
  data,
  role,
  ticketType,
}: // onStatusChange,
| AdminTicketPayload
  | AssigneeTicketPayload
  | ReporterTicketPayload
  | MembersPayload) {
  const navigate = useNavigate();

  const [inputOpen, setInputOpen] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (role === null) {
      navigate("/");
      return;
    }
  }, [role, navigate, data]);

  return (
    <>
      {type === "members" &&
        (inputOpen ? (
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const response = await inviteUser(inputValue);
              toast(response);
              setInputValue("");
              setInputOpen(false);
            }}
            className="flex items-center gap-2"
          >
            <Input
              type="email"
              placeholder="Email"
              className="text-white"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <UserPlus2 />
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={() => {
                setInputOpen(false);
                setInputValue("");
              }}
            >
              <X />
            </Button>
          </form>
        ) : (
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => setInputOpen(true)}
          >
            <UserPlus2 /> Add User
          </Button>
        ))}
      <div className="rounded-md border border-blue-900/20 bg-blue-950/20 backdrop-blur-sm transition-all duration-300">
        <Table>
          <TableHeader className="bg-blue-950/100">
            {type === "ticket" ? (
              <TableRow className="border-blue-900/20 hover:bg-blue-900/10 transition-colors duration-200">
                <TableHead className="text-blue-400 font-semibold">
                  Title
                </TableHead>
                <TableHead className="text-blue-400 font-semibold">
                  Description
                </TableHead>
                <TableHead className="text-blue-400 font-semibold">
                  Status
                </TableHead>
                <TableHead className="text-blue-400 font-semibold">
                  Priority
                </TableHead>
                {((role === "ENGINEER" && ticketType !== "assigned") ||
                  role !== "ENGINEER") && (
                  <TableHead className="text-blue-400 font-semibold">
                    Assignee Name
                  </TableHead>
                )}
                {role === "ADMIN" && ticketType === "all" && (
                  <TableHead className="text-blue-400 font-semibold">
                    Assignee Email
                  </TableHead>
                )}
                {role !== "USER" && ticketType !== "reported" && (
                  <TableHead className="text-blue-400 font-semibold">
                    Reporter Name
                  </TableHead>
                )}
                {role !== "USER" && ticketType !== "reported" && (
                  <TableHead className="text-blue-400 font-semibold">
                    Reporter Email
                  </TableHead>
                )}
                {role === "ADMIN" && ticketType === "all" && (
                  <TableHead className="text-blue-400 font-semibold">
                    Reporter Role
                  </TableHead>
                )}
              </TableRow>
            ) : (
              <TableRow className="border-slate-800 hover:bg-slate-900/50">
                <TableHead className="text-slate-300">Name</TableHead>
                <TableHead className="text-slate-300">Email</TableHead>
                <TableHead className="text-slate-300">Role</TableHead>
              </TableRow>
            )}
          </TableHeader>
          <TableBody>
            {type === "ticket"
              ? data.map((ticket) => (
                  <TableRow
                    key={ticket.id}
                    className={cn(
                      "border-blue-900/20 transition-all duration-300",
                      "hover:bg-blue-900/30 hover:shadow-lg hover:shadow-blue-900/10"
                      // priorityBackgrounds[ticket.priority]
                    )}
                  >
                    <TableCell className="font-medium text-blue-100 group-hover:text-blue-50 transition-colors">
                      {ticket.title}
                    </TableCell>
                    <TableCell className="text-blue-200/80 group-hover:text-blue-100 transition-colors">
                      {ticket.description}
                    </TableCell>
                    <TableCell>
                      {role === "ENGINEER" && ticketType !== "reported" ? (
                        <TicketStatusCell
                          id={ticket.id}
                          status={ticket.status}
                        />
                      ) : (
                        <span
                          className={cn(
                            `px-2 py-1 rounded-full text-sm font-medium ${statusColor.get(
                              ticket.status
                            )}`
                          )}
                        >
                          {ticket.status}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="group-hover:text-blue-100 transition-colors">
                      <span
                        className={cn(
                          "px-2 py-1 rounded-full text-sm font-medium",
                          priorityColors[ticket.priority],
                          priorityBackgrounds[ticket.priority]
                        )}
                      >
                        {ticket.priority}
                      </span>
                    </TableCell>
                    {role === "ENGINEER" && ticketType === "assigned" && (
                      <TableCell className="text-blue-200/80 group-hover:text-blue-100 transition-colors">
                        {/* For ITicketAssignee, reporter info is available */}
                        {(ticket as ITicketAssignee).reporterName}
                      </TableCell>
                    )}
                    {role === "ENGINEER" && ticketType === "reported" && (
                      <TableCell className="text-blue-200/80 group-hover:text-blue-100 transition-colors">
                        {/* For ITicketAssignee, reporter info is available */}
                        {(ticket as ITicketReporter).assigneeName}
                      </TableCell>
                    )}
                    {role === "ENGINEER" && ticketType === "assigned" && (
                      <TableCell className="text-blue-200/80 group-hover:text-blue-100 transition-colors">
                        {/* For ITicketAssignee, reporter info is available */}
                        {(ticket as ITicketAssignee).reporterEmail}
                      </TableCell>
                    )}
                    {role === "USER" && (
                      <TableCell className="text-blue-200/80 group-hover:text-blue-100 transition-colors">
                        {/* For ITicketReporter, assignee info is available */}
                        {(ticket as ITicketReporter).assigneeName}
                      </TableCell>
                    )}
                    {role === "ADMIN" && (
                      <TableCell className="text-blue-200/80 group-hover:text-blue-100 transition-colors">
                        {(ticket as ITicketAdmin).assigneeName}
                      </TableCell>
                    )}
                    {role === "ADMIN" && ticketType !== "reported" && (
                      <TableCell className="text-blue-200/80 group-hover:text-blue-100 transition-colors">
                        {(ticket as ITicketAdmin).assigneeEmail}
                      </TableCell>
                    )}
                    {role === "ADMIN" && ticketType !== "reported" && (
                      <TableCell className="text-blue-200/80 group-hover:text-blue-100 transition-colors">
                        {(ticket as ITicketAdmin).reporterName}
                      </TableCell>
                    )}
                    {role === "ADMIN" && ticketType !== "reported" && (
                      <TableCell className="text-blue-200/80 group-hover:text-blue-100 transition-colors">
                        {(ticket as ITicketAdmin).reporterEmail}
                      </TableCell>
                    )}
                    {role === "ADMIN" && ticketType !== "reported" && (
                      <TableCell className="group-hover:text-blue-100 transition-colors">
                        <span
                          className={cn(
                            `px-2 py-1 rounded-full text-sm font-medium ${getRoleBadgeColor(
                              (ticket as ITicketAdmin).reporterRole
                            )}`
                          )}
                        >
                          {(ticket as ITicketAdmin).reporterRole}
                        </span>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              : data.map((user) => (
                  <TableRow
                    key={user.id}
                    className="border-slate-800 hover:bg-slate-900/50 transition-colors"
                  >
                    <TableCell className="font-medium text-slate-200">
                      {user.name}
                    </TableCell>
                    <TableCell className="text-slate-300">
                      {user.email}
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          `px-2 py-1 rounded-full text-sm font-medium ${getRoleBadgeColor(
                            user.role
                          )}`
                        )}
                      >
                        {user.role}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
