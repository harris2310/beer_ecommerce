import Image from "next/image";
import db from "./db/connection";
import { lucia } from "./auth/auth";
import { userTable as users } from "./db/schema";
import { validateRequest } from "./auth/validateRequest";
import { redirect } from "next/navigation";

export default async function Home() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div>hi</div>
    </main>
  );
}

