"use client"

import { SignInView } from "@/components/auth/login";
import { useSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const Page = () => {
  const session = useSession()

  if (!session) {
    redirect("/sign-up");
  }

  return <SignInView />;
};

export default Page;