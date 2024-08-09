import React from "react";
import { validateRequest } from "../auth/validateRequest";
import { redirect } from "next/navigation";

type Props = {};

export default async function Page() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }
  return <div>youre logged in</div>;
}
