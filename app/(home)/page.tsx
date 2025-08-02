"use client";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function RootPage() {
  const { data: session, isPending } = useSession();

  if (!session) {
    redirect("/login");
  }
  
  if (isPending) {
    return <div>Loading...</div>;
  }

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      <div className="min-h-screen p-8">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p>Welcome, {session.user.name}!</p>
        <p>{session.user.email}</p>
        <p>{session.user.image}</p>
        <Button onClick={handleSignOut}>Sign Out</Button>
      </div>
    </>
  );
}
