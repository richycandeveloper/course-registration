"use client";

import { useRouter } from "next/navigation";

export default function Topbar({ title, subtitle, user }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

  return (
    <header className="flex items-center justify-between border-b border-line bg-white px-4 py-4 sm:px-8 sm:py-5">
      <div>
        <h1 className="font-display text-lg font-semibold text-navy-900 sm:text-xl">
          {title}
        </h1>
        {subtitle && <p className="mt-0.5 text-xs text-ink-soft sm:text-sm">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-ink">{user?.name}</p>
          <p className="text-xs text-ink-soft">
            {user?.matricNumber || user?.email}
          </p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-900 text-xs font-semibold text-white">
          {initials}
        </div>
        <button
          onClick={handleLogout}
          className="rounded-md border border-line px-3 py-1.5 text-sm font-medium text-ink-soft transition hover:border-navy-900/30 hover:text-navy-900"
        >
          Log out
        </button>
      </div>
    </header>
  );
}