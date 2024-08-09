import { cookies } from "next/headers";
import { cache } from "react";

import { Lucia, type Session, type User } from "lucia";
import db from "../db/connection";
import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { sessionTable, userTable } from "../db/schema";

const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter);

export const validateRequest = cache(async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await lucia.validateSession(sessionId);
  // next.js throws when you attempt to set cookie when rendering page
  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    }
  } catch {}
  return result;
});
