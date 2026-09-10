"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import StatCard from "@/components/StatCard";

export default function AdminReportsPage() {
  const [user, setUser] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [meRes, regRes] = await Promise.all([
        fetch("/api/auth/me"),
        fetch("/api/registration"),
      ]);
      setUser((await meRes.json()).user);
      setRegistrations((await regRes.json()).registrations || []);
      setLoading(false);
    }
    load();
  }, []);

  const totalUnits = registrations.reduce((sum, r) => sum + (r.course?.units || 0), 0);
  const uniqueStudents = new Set(registrations.map((r) => r.student?.id)).size;
  const uniqueCourses = new Set(registrations.map((r) => r.course?.id)).size;

  function downloadCsv() {
    window.location.href = "/api/reports/registrations";
  }

  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar role="admin" />
      <div className="flex-1">
        <Topbar
          title="Reports"
          subtitle="Registration summary for the current session"
          user={user}
        />
        <main className="p-8">
          {loading ? (
            <p className="text-sm text-ink-soft">Loading…</p>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatCard label="Total registrations" value={registrations.length} hint="Active" />
                <StatCard label="Students registered" value={uniqueStudents} hint="Unique" accent="gold" />
                <StatCard label="Courses with enrolment" value={uniqueCourses} hint="Active" />
              </div>

              <div className="mt-8 flex items-center justify-between rounded-lg border border-line bg-white p-6">
                <div>
                  <h2 className="font-display text-base font-semibold text-navy-900">
                    Full registration report
                  </h2>
                  <p className="mt-1 text-sm text-ink-soft">
                    Download a CSV of every student, course and unit count for
                    the current session — {totalUnits} total units registered.
                  </p>
                </div>
                <button
                  onClick={downloadCsv}
                  className="shrink-0 rounded-md bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-800"
                >
                  Download CSV
                </button>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}