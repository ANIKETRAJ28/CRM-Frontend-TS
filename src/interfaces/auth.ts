export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister extends ILogin {
  otp: string;
  name: string;
}

export type SignupStep = "email" | "otp" | "profile";
