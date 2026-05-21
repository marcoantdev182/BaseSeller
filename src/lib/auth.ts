import { readStorage, removeStorage, writeStorage } from "@/lib/storage";
import type { RegisterPayload, User } from "@/types/user";

type StoredUser = User & {
  password: string;
};

type AuthResult =
  | {
      ok: true;
      user: User;
      message: string;
    }
  | {
      ok: false;
      message: string;
    };

const USERS_STORAGE_KEY = "baseseller-users";
const SESSION_STORAGE_KEY = "baseseller-session";

const demoAdmin: StoredUser = {
  id: "admin-demo",
  name: "Equipe BaseSeller",
  email: "admin@baseseller.dev",
  phone: "5511999999999",
  password: "baseseller123",
  verified: true,
  role: "admin",
  createdAt: "2026-05-21T00:00:00.000Z",
};

function stripPassword(user: StoredUser): User {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    verified: user.verified,
    role: user.role,
    createdAt: user.createdAt,
  };
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function createId() {
  return typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `user-${Date.now()}`;
}

function readUsers() {
  return readStorage<StoredUser[]>(USERS_STORAGE_KEY, [demoAdmin]);
}

function saveUsers(users: StoredUser[]) {
  writeStorage(USERS_STORAGE_KEY, users);
}

export function loadSessionUser() {
  const sessionId = readStorage<string | null>(SESSION_STORAGE_KEY, null);
  const user = readUsers().find((candidate) => candidate.id === sessionId);
  return user ? stripPassword(user) : null;
}

export function registerLocalUser(payload: RegisterPayload): AuthResult {
  const users = readUsers();
  const email = normalizeEmail(payload.email);

  if (users.some((user) => normalizeEmail(user.email) === email)) {
    return { ok: false, message: "Este e-mail ja possui cadastro." };
  }

  const user: StoredUser = {
    id: createId(),
    name: payload.name.trim(),
    email,
    phone: payload.phone.trim(),
    password: payload.password,
    verified: false,
    role: "customer",
    createdAt: new Date().toISOString(),
  };

  saveUsers([...users, user]);
  writeStorage(SESSION_STORAGE_KEY, user.id);

  return {
    ok: true,
    user: stripPassword(user),
    message: "Cadastro criado. Verifique sua conta para finalizar compras.",
  };
}

export function loginLocalUser(emailValue: string, password: string): AuthResult {
  const email = normalizeEmail(emailValue);
  const user = readUsers().find(
    (candidate) =>
      normalizeEmail(candidate.email) === email && candidate.password === password,
  );

  if (!user) {
    return { ok: false, message: "E-mail ou senha invalidos." };
  }

  writeStorage(SESSION_STORAGE_KEY, user.id);

  return {
    ok: true,
    user: stripPassword(user),
    message: "Login realizado com sucesso.",
  };
}

export function clearSession() {
  removeStorage(SESSION_STORAGE_KEY);
}

export function verifyLocalUser(userId: string) {
  const users = readUsers();
  const targetUser = users.find((user) => user.id === userId);

  if (!targetUser) {
    return null;
  }

  const verifiedUser = { ...targetUser, verified: true };
  saveUsers(
    users.map((user) => (user.id === userId ? verifiedUser : user)),
  );

  return stripPassword(verifiedUser);
}
