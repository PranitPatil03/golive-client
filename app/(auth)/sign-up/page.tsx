"use client"

import { SignUpView } from "@/components/auth/sign-up";
import { useSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const Page =  () => {
  const session =  useSession()

  if (!session) {
    redirect("/sign-up");
  }

  return <SignUpView/>;
};

export default Page;