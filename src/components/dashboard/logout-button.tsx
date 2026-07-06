"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleLogout() {
    setIsSigningOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <Button
      variant="ghost"
      className="w-full justify-start gap-2.5 px-2.5"
      onClick={handleLogout}
      disabled={isSigningOut}
    >
      <LogOut className="size-4" />
      {isSigningOut ? "Logging out…" : "Log out"}
    </Button>
  );
}
