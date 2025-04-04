import { useEffect, useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  addOrg,
  addOrgAsEngineer,
  addOrgForUser,
  getOrgs,
} from "@/store/slices/orgSlice";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Building2, Code, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { TicketProvider, ticketContext } from "@/context/TicketContext";
import { ITicketPriority } from "@/interfaces/ticket";
import { TicketPriorityCell } from "@/components/TicketPriorityCell";
import {
  createTicketForAdmin,
  createTicketForUsers,
} from "@/store/slices/reportedTicketSlice";

function ProtectedLayout({ children }: { children: React.ReactElement }) {
  const navigate = useNavigate();
  const { id } = useAppSelector((state) => state.auth);
  const org = useAppSelector((state) => state.org);
  const { activeOrgRole } = useAppSelector((state) => state.activeOrg);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const ticketRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [orgInput, setOrgInput] = useState<string>("");
  const [inviteCode, setInviteCode] = useState<string>("");
  const [userOrgInput, setUserOrgInput] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [priority, setPriority] = useState<ITicketPriority>("LOW");

  const { createTicket, setCreateTicket } = useContext(ticketContext);

  useEffect(() => {
    if (id === null) {
      navigate("/");
    } else if (org.orgs === null) {
      dispatch(getOrgs());
    }
  }, [org, id, navigate, dispatch]);

  // Outside click for the modal component
  useEffect(() => {
    const handleModalClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOrgInput("");
        setUserOrgInput("");
        setInviteCode("");
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleModalClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleModalClickOutside);
    };
  }, [open]);

  // Outside click for the ticket component
  useEffect(() => {
    const handleTicketClickOutside = (event: MouseEvent) => {
      // Check if click is inside ticketRef...
      if (
        ticketRef.current &&
        ticketRef.current.contains(event.target as Node)
      ) {
        return;
      }
      // ...or if the click happened in the dropdown area (if it’s rendered via a portal)
      if (
        dropdownRef.current &&
        dropdownRef.current.contains(event.target as Node)
      ) {
        return;
      }
      setCreateTicket(false);
    };

    if (createTicket) {
      document.addEventListener("mousedown", handleTicketClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleTicketClickOutside);
    };
  }, [createTicket, setCreateTicket]);

  return (
    <div className="pt-16 flex relative h-screen overflow-x-hidden">
      <Sidebar setOpen={setOpen} />

      {/* Modal Overlay for Organization Modal */}
      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-10"
            onClick={() => {
              setOrgInput("");
              setUserOrgInput("");
              setInviteCode("");
              setOpen(false);
            }}
          ></div>
          <div
            ref={modalRef}
            className="fixed z-20 bg-slate-950 w-full sm:w-fit flex items-center justify-center p-0.5 m-auto rounded-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
          >
            <Card className="w-full max-w-md bg-slate-800 text-white border-slate-950 pt-6 px-1">
              <Tabs
                defaultValue="create"
                className="w-full"
              >
                <TabsList className="w-full grid grid-cols-3 bg-slate-700 text-xs sm:text-sm rounded-2xl">
                  <TabsTrigger
                    value="create"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:hover:bg-blue-700 text-white flex items-center justify-center p-2 rounded-2xl"
                  >
                    <Building2 className="w-4 h-4 mr-2" />
                    <span className="hidden sm:block">Create Org</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="join-user"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:hover:bg-blue-700 text-white flex items-center justify-center p-2 rounded-2xl"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    <span className="hidden sm:block">Join User</span>
                  </TabsTrigger>
                  <TabsTrigger
                    value="join-engineer"
                    className="data-[state=active]:bg-blue-600 data-[state=active]:hover:bg-blue-700 text-white flex items-center justify-center p-2 rounded-2xl"
                  >
                    <Code className="w-4 h-4 mr-2" />
                    <span className="hidden sm:block">Join Engineer</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value="create"
                  className="pt-6"
                >
                  <h2 className="text-xl font-semibold mb-4">
                    Create Organization
                  </h2>
                  <div className="space-y-4">
                    <Input
                      value={orgInput}
                      onChange={(e) => setOrgInput(e.target.value)}
                      placeholder="Organization Name"
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    />
                    <Button
                      onClick={async () => {
                        const orgName = orgInput.trim();
                        if (orgName === "") {
                          toast.error("Organization name cannot be empty", {
                            style: {
                              background: "#ff0000",
                              border: "1px solid #ff0000",
                              color: "#fff",
                            },
                          });
                          return;
                        }
                        dispatch(addOrg(orgName));
                        setOrgInput("");
                        setOpen(false);
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Create Organization
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent
                  value="join-user"
                  className="pt-6"
                >
                  <h2 className="text-xl font-semibold mb-4">Join as User</h2>
                  <div className="space-y-4">
                    <Input
                      value={userOrgInput}
                      onChange={(e) => setUserOrgInput(e.target.value)}
                      placeholder="Organization Name"
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    />
                    <Button
                      onClick={async () => {
                        const orgName = userOrgInput.trim();
                        if (orgName === "") {
                          toast.error("Organization name cannot be empty", {
                            style: {
                              background: "#ff0000",
                              border: "1px solid #ff0000",
                              color: "#fff",
                            },
                          });
                          return;
                        }
                        await dispatch(addOrgForUser(orgName));
                        setUserOrgInput("");
                        setOpen(false);
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Join Organization
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent
                  value="join-engineer"
                  className="pt-6"
                >
                  <h2 className="text-xl font-semibold mb-4">
                    Join as Engineer
                  </h2>
                  <div className="space-y-4">
                    <Input
                      placeholder="Invite Code"
                      value={inviteCode}
                      onChange={(e) => setInviteCode(e.target.value)}
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    />
                    <Button
                      onClick={async () => {
                        const code = inviteCode.trim();
                        if (code === "") {
                          toast.error("Invite code cannot be empty", {
                            style: {
                              background: "#ff0000",
                              border: "1px solid #ff0000",
                              color: "#fff",
                            },
                          });
                          return;
                        }
                        await dispatch(addOrgAsEngineer(code));
                        setInviteCode("");
                        setOpen(false);
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Join as Engineer
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </>
      )}

      {/* Ticket Modal with its own overlay */}
      {createTicket && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-10"
            onClick={() => setCreateTicket(false)}
          ></div>
          <div
            ref={ticketRef}
            className="fixed z-20 bg-slate-950 flex items-center justify-center p-0.5 m-auto rounded-xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
          >
            <Card className="w-sm sm:w-md bg-slate-800 text-white border-slate-950 pt-6 px-1">
              <div>
                <div className="flex justify-between items-center px-2">
                  <h2 className="text-xl font-semibold mb-4">Create Ticket</h2>
                  {/* 
                    Pass the dropdownRef to TicketPriorityCell so that inside that component,
                    when rendering the dropdown, you attach this ref to the container element.
                  */}
                  <TicketPriorityCell
                    priority={priority}
                    onPriorityChange={(priority) => setPriority(priority)}
                    dropdownRef={dropdownRef}
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold mb-4">Title</h3>
                  <Input
                    placeholder="Title"
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <h3 className="text-lg font-semibold mb-4">Description</h3>
                  <Input
                    placeholder="Description"
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <Button
                    onClick={async () => {
                      if (activeOrgRole === "USER") {
                        await dispatch(
                          createTicketForUsers({
                            description,
                            priority,
                            title,
                          })
                        );
                      } else {
                        await dispatch(
                          createTicketForAdmin({
                            description,
                            priority,
                            title,
                          })
                        );
                        setDescription("");
                        setTitle("");
                        setPriority("LOW");
                        setCreateTicket(false);
                      }
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Create Ticket
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </>
      )}

      <main className="flex-1 relative">
        <div className="absolute inset-0 p-4 sm:p-8">{children}</div>
      </main>
    </div>
  );
}

export default function ProtectedLayoutWrapper({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <TicketProvider>
      <ProtectedLayout>{children}</ProtectedLayout>
    </TicketProvider>
  );
}
