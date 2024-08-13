import React from "react";
import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { lucia } from "../auth/auth";
import { eq, isNotNull } from "drizzle-orm";
import { redirect } from "next/navigation";
import db from "../db/connection";
import { userTable } from "../db/schema";
import { validateRequest } from "../auth/validateRequest";

// app/login/page.tsx
export default async function Page() {
  return (
    <>
      <h1>Sign in</h1>
      <form action={login}>
        <label htmlFor='username'>Username</label>
        <input name='username' id='username' />
        <br />
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' id='password' />
        <br />
        <button>Continue</button>
      </form>
    </>
  );
}

async function login(formData: FormData): Promise<ActionResult> {
  "use server";
  const username = formData.get("username");
  if (typeof username !== "string" || username.length < 3 || username.length > 31 || !/^[a-z0-9_-]+$/.test(username)) {
    return {
      error: "Invalid username",
    };
  }
  const password = formData.get("password");
  if (typeof password !== "string" || password.length < 6 || password.length > 255) {
    return {
      error: "Invalid password",
    };
  }

  const existingUser = await db.select().from(userTable).where(eq(userTable.name, username)).get();
  if (!existingUser) {
    return {
      error: "Incorrect username or password",
    };
  }

  const validPassword = await verify(existingUser.password_hash!, password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
  if (!validPassword) {
    return {
      error: "Incorrect username or password",
    };
  }

  const session = await lucia.createSession(existingUser.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
  return redirect("/");
}
interface ActionResult {
  error: string;
}
