"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

const EMPTY_FORM = {
  code: "",
  title: "",
  description: "",
  units: 3,
  department: "",
  level: "ND1",
  semester: "First Semester",
};

export default function AdminCoursesPage() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  async function loadAll() {
    const [meRes, coursesRes] = await Promise.all([
      fetch("/api/auth/me"),
      fetch("/api/courses"),
    ]);
    setUser((await meRes.json()).user);
    setCourses((await coursesRes.json()).courses || []);
    setLoading(false);
  }

  useEffect(() => {
    loadAll();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const res = await fetch("/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Could not create course.");
      setSaving(false);
      return;
    }

    setCourses((prev) => [...prev, data.course].sort((a, b) => a.code.localeCompare(b.code)));
    setForm(EMPTY_FORM);
    setSaving(false);
  }

  async function handleDelete(id) {
    await fetch(`/api/courses/${id}`, { method: "DELETE" });
    setCourses((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div className="flex min-h-screen flex-col bg-paper md:flex-row">
      <Sidebar role="admin" />
      <div className="flex-1 min-w-0">
        <Topbar title="Courses" subtitle={`${courses.length} in catalogue`} user={user} />
        <main className="grid grid-cols-1 gap-6 p-4 sm:p-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {loading ? (
              <p className="text-sm text-ink-soft">Loading…</p>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-line bg-white">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <thead className="bg-navy-900/5 text-xs font-semibold uppercase tracking-wide text-ink-soft">
                    <tr>
                      <th className="px-5 py-3">Code</th>
                      <th className="px-5 py-3">Title</th>
                      <th className="px-5 py-3">Units</th>
                      <th className="px-5 py-3">Level</th>
                      <th className="px-5 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {courses.map((c) => (
                      <tr key={c.id}>
                        <td className="px-5 py-3.5 font-medium text-ink">{c.code}</td>
                        <td className="px-5 py-3.5 text-ink-soft">{c.title}</td>
                        <td className="px-5 py-3.5 text-ink-soft">{c.units}</td>
                        <td className="px-5 py-3.5 text-ink-soft">{c.level}</td>
                        <td className="px-5 py-3.5 text-right">
                          <button
                            onClick={() => handleDelete(c.id)}
                            className="text-xs font-medium text-red-600 hover:underline"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="rounded-lg border border-line bg-white p-6">
            <h2 className="font-display text-base font-semibold text-navy-900">
              Add a course
            </h2>

            {error && (
              <div className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleCreate} className="mt-4 space-y-3">
              <input
                required
                placeholder="Course code (e.g. CSC301)"
                value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value })}
                className="w-full rounded-md border border-line px-3 py-2 text-sm outline-none focus:border-navy-700 focus:ring-2 focus:ring-navy-700/10"
              />
              <input
                required
                placeholder="Course title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full rounded-md border border-line px-3 py-2 text-sm outline-none focus:border-navy-700 focus:ring-2 focus:ring-navy-700/10"
              />
              <textarea
                placeholder="Description (optional)"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full rounded-md border border-line px-3 py-2 text-sm outline-none focus:border-navy-700 focus:ring-2 focus:ring-navy-700/10"
                rows={2}
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  min="1"
                  placeholder="Units"
                  value={form.units}
                  onChange={(e) => setForm({ ...form, units: e.target.value })}
                  className="w-full rounded-md border border-line px-3 py-2 text-sm outline-none focus:border-navy-700 focus:ring-2 focus:ring-navy-700/10"
                />
                <select
                  value={form.level}
                  onChange={(e) => setForm({ ...form, level: e.target.value })}
                  className="w-full rounded-md border border-line bg-white px-3 py-2 text-sm outline-none focus:border-navy-700 focus:ring-2 focus:ring-navy-700/10"
                >
                  {["ND1", "ND2", "HND1", "HND2"].map((lvl) => (
                    <option key={lvl} value={lvl}>{lvl}</option>
                  ))}
                </select>
              </div>
              <input
                required
                placeholder="Department"
                value={form.department}
                onChange={(e) => setForm({ ...form, department: e.target.value })}
                className="w-full rounded-md border border-line px-3 py-2 text-sm outline-none focus:border-navy-700 focus:ring-2 focus:ring-navy-700/10"
              />
              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-md bg-navy-900 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-800 disabled:opacity-60"
              >
                {saving ? "Adding…" : "Add course"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}