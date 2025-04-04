export interface IUserOrg {
  id: string;
  userId: string;
  org: {
    id: string;
    name: string;
  };
  role: IOrgRole;
}

export type IOrgRole = "ADMIN" | "ENGINEER" | "USER";
