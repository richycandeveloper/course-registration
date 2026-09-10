"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function AdminStudentsPage() {
  const [user, setUser] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [meRes, studentsRes] = await Promise.all([
        fetch("/api/auth/me"),
        fetch("/api/students"),
      ]);
      setUser((await meRes.json()).user);
      setStudents((await studentsRes.json()).students || []);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar role="admin" />
      <div className="flex-1">
        <Topbar title="Students" subtitle={`${students.length} enrolled`} user={user} />
        <main className="p-8">
          {loading ? (
            <p className="text-sm text-ink-soft">Loading…</p>
          ) : students.length === 0 ? (
            <div className="rounded-lg border border-dashed border-line bg-white px-6 py-12 text-center text-sm text-ink-soft">
              No students have registered yet.
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border border-line bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-navy-900/5 text-xs font-semibold uppercase tracking-wide text-ink-soft">
                  <tr>
                    <th className="px-5 py-3">Name</th>
                    <th className="px-5 py-3">Matric Number</th>
                    <th className="px-5 py-3">Department</th>
                    <th className="px-5 py-3">Level</th>
                    <th className="px-5 py-3">Courses</th>
                    <th className="px-5 py-3">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {students.map((s) => (
                    <tr key={s.id}>
                      <td className="px-5 py-3.5 font-medium text-ink">
                        {s.firstName} {s.lastName}
                      </td>
                      <td className="px-5 py-3.5 text-ink-soft">{s.matricNumber}</td>
                      <td className="px-5 py-3.5 text-ink-soft">{s.department}</td>
                      <td className="px-5 py-3.5 text-ink-soft">{s.level}</td>
                      <td className="px-5 py-3.5 text-ink-soft">{s._count?.registrations ?? 0}</td>
                      <td className="px-5 py-3.5 text-ink-soft">
                        {new Date(s.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
