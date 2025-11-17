export type AccountRole = "curator" | "finder";

export interface ProfileFormValues {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
}

export type SignupStep = "role" | "profile" | "wallet";
