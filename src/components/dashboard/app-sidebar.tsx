import Link from "next/link";
import { LayoutDashboard, ListChecks, BookOpen } from "lucide-react";

import { LogoutButton } from "@/components/dashboard/logout-button";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Tasks", href: "/dashboard", icon: ListChecks },
  { label: "Subjects", href: "/dashboard", icon: BookOpen },
];

export function AppSidebar() {
  return (
    <aside className="flex h-full w-60 shrink-0 flex-col border-r border-border bg-sidebar px-4 py-5">
      <Link href="/" className="px-2 text-lg font-semibold tracking-tight">
        StudyTask
      </Link>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
          >
            <Icon className="size-4" />
            {label}
          </Link>
        ))}
      </nav>

      <LogoutButton />
    </aside>
  );
}
