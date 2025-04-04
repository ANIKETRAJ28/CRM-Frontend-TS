import { IUserOrgMember } from "@/interfaces/user";
import { Table } from "@/pages/Table";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "lucide-react";
import { IOrgRole } from "@/interfaces/userOrg";

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

}

export function MemberTable({ data }: { data: IUserOrgMember[] }) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/50">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-800 hover:bg-slate-900/50">
            <TableHead className="text-slate-300">Name</TableHead>
            <TableHead className="text-slate-300">Email</TableHead>
            <TableHead className="text-slate-300">Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user) => (
            <TableRow
              key={user.id}
              className="border-slate-800 hover:bg-slate-900/50 transition-colors"
            >
              <TableCell className="font-medium text-slate-200">
                {user.name}
              </TableCell>
              <TableCell className="text-slate-300">{user.email}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`${getRoleBadgeColor(user.role)} border-0`}
                >
                  {user.role}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
