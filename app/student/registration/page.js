"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import RegistrationTable from "@/components/RegistrationTable";

export default function StudentRegistrationPage() {
  const [user, setUser] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadAll() {
    const [meRes, regRes] = await Promise.all([
      fetch("/api/auth/me"),
      fetch("/api/registration"),
    ]);
    const me = await meRes.json();
    const reg = await regRes.json();
    setUser(me.user);
    setRegistrations(reg.registrations || []);
    setLoading(false);
  }

  useEffect(() => {
    loadAll();
  }, []);

  async function handleDrop(courseId) {
    await fetch(`/api/registration?courseId=${courseId}`, { method: "DELETE" });
    setRegistrations((prev) => prev.filter((r) => r.course.id !== courseId));
  }

  const totalUnits = registrations.reduce(
    (sum, r) => sum + (r.course?.units || 0),
    0
  );

  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar role="student" />
      <div className="flex-1">
        <Topbar
          title="My Registration"
          subtitle={`${registrations.length} course(s) · ${totalUnits} units`}
          user={user}
        />
        <main className="p-8">
          <div className="mb-5 flex justify-end">
            <Link
              href="/student/registration/slip"
              className="rounded-md border border-line px-4 py-2 text-sm font-medium text-navy-900 transition hover:border-navy-900/30"
            >
              View / Print registration slip
            </Link>
          </div>
          {loading ? (
            <p className="text-sm text-ink-soft">Loading…</p>
          ) : (
            <RegistrationTable
              registrations={registrations}
              role="student"
              onDrop={handleDrop}
            />
          )}
        </main>
      </div>
    </div>
  );
}