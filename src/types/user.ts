export type UserRole = "customer" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  verified: boolean;
  role: UserRole;
  createdAt: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

