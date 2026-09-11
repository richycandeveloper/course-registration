"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import StatCard from "@/components/StatCard";

export default function StudentDashboard() {
  const [user, setUser] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [meRes, regRes, settingsRes] = await Promise.all([
        fetch("/api/auth/me"),
        fetch("/api/registration"),
        fetch("/api/settings"),
      ]);
      const me = await meRes.json();
      const reg = await regRes.json();
      const settingsData = await settingsRes.json();
      setUser(me.user);
      setRegistrations(reg.registrations || []);
      setSettings(settingsData.settings);
      setLoading(false);
    }
    load();
  }, []);

  const totalUnits = registrations.reduce(
    (sum, r) => sum + (r.course?.units || 0),
    0
  );

  return (
    <div className="flex min-h-screen flex-col bg-paper md:flex-row">
      <Sidebar role="student" />
      <div className="flex-1 min-w-0">
        <Topbar
          title="Dashboard"
          subtitle="Overview of your current semester"
          user={user}
        />
        <main className="p-4 sm:p-8">
          {loading ? (
            <p className="text-sm text-ink-soft">Loading your dashboard…</p>
          ) : (
            <>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-line bg-white px-5 py-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-ink-soft">
                    Current session
                  </p>
                  <p className="mt-0.5 font-display text-lg font-semibold text-navy-900">
                    {settings?.currentSession} · {settings?.currentSemester}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    settings?.registrationOpen
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  Registration {settings?.registrationOpen ? "Open" : "Closed"}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatCard
                  label="Registered courses"
                  value={registrations.length}
                  hint="This semester"
                />
                <StatCard
                  label="Total units"
                  value={totalUnits}
                  hint="Credit load"
                  accent="gold"
                />
                <StatCard
                  label="Department"
                  value={user?.matricNumber?.split("/")[3] || "—"}
                  hint="Enrolled"
                />
              </div>

              <div className="mt-8 rounded-lg border border-line bg-white p-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-lg font-semibold text-navy-900">
                    Recent registrations
                  </h2>
                  <Link
                    href="/student/courses"
                    className="text-sm font-medium text-navy-900 hover:underline"
                  >
                    Browse courses →
                  </Link>
                </div>

                {registrations.length === 0 ? (
                  <p className="mt-4 text-sm text-ink-soft">
                    You haven&apos;t registered for any courses yet.
                  </p>
                ) : (
                  <div className="mt-4 divide-y divide-line">
                    {registrations.slice(0, 5).map((reg) => (
                      <div
                        key={reg.id}
                        className="flex items-center justify-between py-3"
                      >
                        <div>
                          <p className="text-sm font-medium text-ink">
                            {reg.course?.code} — {reg.course?.title}
                          </p>
                          <p className="text-xs text-ink-soft">
                            {reg.course?.units} units
                          </p>
                        </div>
                        <span className="rounded-full bg-navy-900/5 px-2.5 py-1 text-xs font-medium text-navy-800">
                          Registered
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}