import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "@/db";
import {
  usersTable,
  sessionsTable,
  verificationsTable,
  accountsTable,
} from "@/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      users: usersTable,
      sessions: sessionsTable,
      verifications: verificationsTable,
      accounts: accountsTable,
    },
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
  },
});
