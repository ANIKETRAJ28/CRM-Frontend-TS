import { IOrgRole } from "./userOrg";

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export interface IUserOrgMember extends IUser {
  role: IOrgRole;
}

export interface IUserAuth extends IUser {
  iat: number;
  exp: number;
}
