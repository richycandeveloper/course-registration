"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import StatCard from "@/components/StatCard";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [meRes, studentsRes, coursesRes, regRes] = await Promise.all([
        fetch("/api/auth/me"),
        fetch("/api/students"),
        fetch("/api/courses"),
        fetch("/api/registration"),
      ]);
      setUser((await meRes.json()).user);
      setStudents((await studentsRes.json()).students || []);
      setCourses((await coursesRes.json()).courses || []);
      setRegistrations((await regRes.json()).registrations || []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar role="admin" />
      <div className="flex-1">
        <Topbar
          title="Admin Dashboard"
          subtitle="Registry overview"
          user={user}
        />
        <main className="p-8">
          {loading ? (
            <p className="text-sm text-ink-soft">Loading…</p>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <StatCard label="Total students" value={students.length} hint="Enrolled" />
                <StatCard label="Courses offered" value={courses.length} hint="Catalogue" accent="gold" />
                <StatCard label="Active registrations" value={registrations.length} hint="This semester" />
              </div>

              <div className="mt-8 rounded-lg border border-line bg-white p-6">
                <h2 className="font-display text-lg font-semibold text-navy-900">
                  Recently registered
                </h2>
                {registrations.length === 0 ? (
                  <p className="mt-4 text-sm text-ink-soft">
                    No registrations recorded yet.
                  </p>
                ) : (
                  <div className="mt-4 divide-y divide-line">
                    {registrations.slice(0, 6).map((reg) => (
                      <div key={reg.id} className="flex items-center justify-between py-3">
                        <div>
                          <p className="text-sm font-medium text-ink">
                            {reg.student?.firstName} {reg.student?.lastName}
                          </p>
                          <p className="text-xs text-ink-soft">
                            {reg.course?.code} — {reg.course?.title}
                          </p>
                        </div>
                        <span className="text-xs text-ink-soft">
                          {new Date(reg.registeredAt).toLocaleDateString()}
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
