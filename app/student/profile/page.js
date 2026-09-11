"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function StudentProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user));
  }, []);

  const parts = user?.matricNumber?.split("/") || [];
  const [, , programme, department, year] = parts;

  return (
    <div className="flex min-h-screen flex-col bg-paper md:flex-row">
      <Sidebar role="student" />
      <div className="flex-1 min-w-0">
        <Topbar title="Profile" subtitle="Your account details" user={user} />
        <main className="p-4 sm:p-8">
          <div className="max-w-lg rounded-lg border border-line bg-white p-6">
            <div className="flex items-center gap-4 border-b border-line pb-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-navy-900 font-display text-lg font-semibold text-white">
                {user?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </div>
              <div>
                <p className="font-display text-lg font-semibold text-navy-900">
                  {user?.name}
                </p>
                <p className="text-sm text-ink-soft">{user?.matricNumber}</p>
              </div>
            </div>

            <dl className="mt-5 space-y-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-soft">Programme</dt>
                <dd className="font-medium text-ink">
                  {programme?.toUpperCase() || "—"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Department</dt>
                <dd className="font-medium text-ink">
                  {department
                    ?.split("-")
                    .map((w) => w[0]?.toUpperCase() + w.slice(1))
                    .join(" ") || "—"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Admission year</dt>
                <dd className="font-medium text-ink">{year || "—"}</dd>
              </div>
            </dl>
          </div>
        </main>
      </div>
    </div>
  );
}