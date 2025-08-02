"use client";

import { SignUpView } from "@/components/auth/sign-up";
import { useSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const Page = () => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (session) {
    redirect("/");
  }

  return <SignUpView />;
};

export default Page;
