"use client";

import { SignInView } from "@/components/auth/login";
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

  return <SignInView />;
};

export default Page;
