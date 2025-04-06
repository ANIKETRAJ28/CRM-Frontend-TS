import { logout } from "@/apis/logout";
import { Button } from "@/components/ui/button";
import { Building2, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAppSelector, useAppDispatch } from "@/hooks/index";
import { removeUser } from "@/store/slices/authSlice";
import { removeOrg } from "@/store/slices/orgSlice";
import { removeActiveOrg } from "@/store/slices/activeOrgSlice";
import { removeAssignedTicket } from "@/store/slices/assignedTicketSlice";
import { removeReportedTicket } from "@/store/slices/reportedTicketSlice";
import { removeToggleActiveState } from "@/store/slices/acticeToggleSlice";
import { removeAdminTicket } from "@/store/slices/adminTicketSlice";
import { removeOrgMember } from "@/store/slices/orgMemberSlice";

export function Layout({ children }: { children: React.ReactElement }) {
  const user = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      dispatch(removeUser());
      dispatch(removeOrg());
      dispatch(removeActiveOrg());
      dispatch(removeToggleActiveState());
      dispatch(removeAdminTicket());
      dispatch(removeAssignedTicket());
      dispatch(removeReportedTicket());
      dispatch(removeOrgMember());
      toast.success("Logout successful", {
        style: {
          background: "#4caf50",
          border: "1px solid #4caf50",
          color: "#fff",
        },
      });
    } catch (error) {
      console.error(error);
      toast.error("Logout failed", {
        style: {
          background: "#ff0000",
          border: "1px solid #ff0000",
          color: "#fff",
        },
      });
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-[#000B2E] to-slate-950">
      <nav className="border-b border-blue-900/20 backdrop-blur-sm fixed w-full z-50">
        <div className="mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-blue-500" />
            <span className="text-2xl font-bold bg-blue-500 text-transparent bg-clip-text">
              NexusCRM
            </span>
          </div>
          {user.id ? (
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 rounded-full p-2 shadow-lg hidden sm:block">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="overflow-hidden animate-slide-in">
                <p className="font-medium truncate text-white sm:block hidden">
                  {user.name}
                </p>
                <p className="text-sm text-slate-400 hidden sm:block truncate">
                  {user.email}
                </p>
              </div>
              <Button
                onClick={handleLogout}
                className="bg-blue-700 hover:bg-blue-800 transition-colors duration-300"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => navigate("/login")}
                className="bg-blue-700 hover:bg-blue-800 transition-colors duration-300"
              >
                Login
              </Button>
            </div>
          )}
        </div>
      </nav>
      {children}
      {/* <div>{children}</div> */}
    </div>
  );
}
