"use client";

import { useSession } from "@/lib/auth-client";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return <div>Loading...</div>;
  }
  
  if (!session) {
    redirect("/sign-up");
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p>Welcome, {session.user.name}!</p>
      <p>{session.user.email}</p>
      <p>{session.user.image}</p>
    </div>
  );
}
