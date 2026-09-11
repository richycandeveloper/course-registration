"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function AdminSettingsPage() {
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [meRes, settingsRes] = await Promise.all([
        fetch("/api/auth/me"),
        fetch("/api/settings"),
      ]);
      setUser((await meRes.json()).user);
      setSettings((await settingsRes.json()).settings);
      setLoading(false);
    }
    load();
  }, []);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    const data = await res.json();

    if (res.ok) {
      setSettings(data.settings);
      setMessage("Settings updated successfully.");
    } else {
      setMessage(data.error || "Could not update settings.");
    }
    setSaving(false);
  }

  async function toggleRegistration() {
    setSaving(true);
    const res = await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ registrationOpen: !settings.registrationOpen }),
    });
    const data = await res.json();
    if (res.ok) setSettings(data.settings);
    setSaving(false);
  }

  return (
    <div className="flex min-h-screen flex-col bg-paper md:flex-row">
      <Sidebar role="admin" />
      <div className="flex-1 min-w-0">
        <Topbar
          title="Session Settings"
          subtitle="Control the active session, semester and registration window"
          user={user}
        />
        <main className="p-4 sm:p-8">
          {loading ? (
            <p className="text-sm text-ink-soft">Loading…</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-lg border border-line bg-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-base font-semibold text-navy-900">
                      Registration status
                    </h2>
                    <p className="mt-1 text-sm text-ink-soft">
                      Students can only register or drop courses while this is open.
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      settings.registrationOpen
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {settings.registrationOpen ? "Open" : "Closed"}
                  </span>
                </div>
                <button
                  onClick={toggleRegistration}
                  disabled={saving}
                  className={`mt-5 w-full rounded-md py-2.5 text-sm font-semibold text-white transition disabled:opacity-60 ${
                    settings.registrationOpen
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {settings.registrationOpen
                    ? "Close registration"
                    : "Open registration"}
                </button>
              </div>

              <form
                onSubmit={handleSave}
                className="rounded-lg border border-line bg-white p-6"
              >
                <h2 className="font-display text-base font-semibold text-navy-900">
                  Current session &amp; semester
                </h2>

                {message && (
                  <div className="mt-3 rounded-md border border-navy-900/10 bg-navy-900/5 px-3 py-2 text-xs text-navy-800">
                    {message}
                  </div>
                )}

                <div className="mt-4 space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-ink">
                      Academic session
                    </label>
                    <input
                      value={settings.currentSession}
                      onChange={(e) =>
                        setSettings({ ...settings, currentSession: e.target.value })
                      }
                      placeholder="2025/2026"
                      className="mt-1.5 w-full rounded-md border border-line px-3.5 py-2.5 text-sm outline-none focus:border-navy-700 focus:ring-2 focus:ring-navy-700/10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink">
                      Semester
                    </label>
                    <select
                      value={settings.currentSemester}
                      onChange={(e) =>
                        setSettings({ ...settings, currentSemester: e.target.value })
                      }
                      className="mt-1.5 w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-navy-700 focus:ring-2 focus:ring-navy-700/10"
                    >
                      <option>First Semester</option>
                      <option>Second Semester</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={saving}
                  className="mt-5 w-full rounded-md bg-navy-900 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-800 disabled:opacity-60"
                >
                  {saving ? "Saving…" : "Save changes"}
                </button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}