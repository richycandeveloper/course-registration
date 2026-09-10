"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function AdminDepartmentsPage() {
  const [user, setUser] = useState(null);
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [facultyName, setFacultyName] = useState("");
  const [deptName, setDeptName] = useState("");
  const [deptFacultyId, setDeptFacultyId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadAll() {
    const [meRes, facRes, deptRes] = await Promise.all([
      fetch("/api/auth/me"),
      fetch("/api/faculties"),
      fetch("/api/departments"),
    ]);
    setUser((await meRes.json()).user);
    setFaculties((await facRes.json()).faculties || []);
    setDepartments((await deptRes.json()).departments || []);
    setLoading(false);
  }

  useEffect(() => {
    loadAll();
  }, []);

  async function handleAddFaculty(e) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/faculties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: facultyName }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
      return;
    }
    setFaculties((prev) => [...prev, data.faculty].sort((a, b) => a.name.localeCompare(b.name)));
    setFacultyName("");
  }

  async function handleAddDepartment(e) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/departments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: deptName, facultyId: deptFacultyId || null }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
      return;
    }
    setDepartments((prev) => [...prev, data.department].sort((a, b) => a.name.localeCompare(b.name)));
    setDeptName("");
  }

  async function handleDeleteFaculty(id) {
    await fetch(`/api/faculties/${id}`, { method: "DELETE" });
    setFaculties((prev) => prev.filter((f) => f.id !== id));
  }

  async function handleDeleteDepartment(id) {
    await fetch(`/api/departments/${id}`, { method: "DELETE" });
    setDepartments((prev) => prev.filter((d) => d.id !== id));
  }

  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar role="admin" />
      <div className="flex-1">
        <Topbar
          title="Faculties & Departments"
          subtitle="Manage the academic structure of the institute"
          user={user}
        />
        <main className="p-8">
          {error && (
            <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {loading ? (
            <p className="text-sm text-ink-soft">Loading…</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Faculties */}
              <div className="rounded-lg border border-line bg-white p-6">
                <h2 className="font-display text-base font-semibold text-navy-900">
                  Faculties / Schools
                </h2>
                <form onSubmit={handleAddFaculty} className="mt-4 flex gap-2">
                  <input
                    required
                    value={facultyName}
                    onChange={(e) => setFacultyName(e.target.value)}
                    placeholder="e.g. School of Applied Sciences"
                    className="flex-1 rounded-md border border-line px-3 py-2 text-sm outline-none focus:border-navy-700 focus:ring-2 focus:ring-navy-700/10"
                  />
                  <button className="rounded-md bg-navy-900 px-4 text-sm font-medium text-white hover:bg-navy-800">
                    Add
                  </button>
                </form>

                <div className="mt-4 divide-y divide-line">
                  {faculties.length === 0 && (
                    <p className="py-3 text-sm text-ink-soft">No faculties added yet.</p>
                  )}
                  {faculties.map((f) => (
                    <div key={f.id} className="flex items-center justify-between py-3">
                      <div>
                        <p className="text-sm font-medium text-ink">{f.name}</p>
                        <p className="text-xs text-ink-soft">
                          {f.departments?.length || 0} department(s)
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteFaculty(f.id)}
                        className="text-xs font-medium text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Departments */}
              <div className="rounded-lg border border-line bg-white p-6">
                <h2 className="font-display text-base font-semibold text-navy-900">
                  Departments
                </h2>
                <form onSubmit={handleAddDepartment} className="mt-4 space-y-2">
                  <input
                    required
                    value={deptName}
                    onChange={(e) => setDeptName(e.target.value)}
                    placeholder="e.g. Computer Science"
                    className="w-full rounded-md border border-line px-3 py-2 text-sm outline-none focus:border-navy-700 focus:ring-2 focus:ring-navy-700/10"
                  />
                  <select
                    value={deptFacultyId}
                    onChange={(e) => setDeptFacultyId(e.target.value)}
                    className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm outline-none focus:border-navy-700 focus:ring-2 focus:ring-navy-700/10"
                  >
                    <option value="">No faculty assigned</option>
                    {faculties.map((f) => (
                      <option key={f.id} value={f.id}>{f.name}</option>
                    ))}
                  </select>
                  <button className="w-full rounded-md bg-navy-900 py-2 text-sm font-medium text-white hover:bg-navy-800">
                    Add department
                  </button>
                </form>

                <div className="mt-4 divide-y divide-line">
                  {departments.length === 0 && (
                    <p className="py-3 text-sm text-ink-soft">No departments added yet.</p>
                  )}
                  {departments.map((d) => (
                    <div key={d.id} className="flex items-center justify-between py-3">
                      <div>
                        <p className="text-sm font-medium text-ink">{d.name}</p>
                        <p className="text-xs text-ink-soft">
                          {d.faculty?.name || "No faculty"}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteDepartment(d.id)}
                        className="text-xs font-medium text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}