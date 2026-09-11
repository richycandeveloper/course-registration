"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function RegistrationSlipPage() {
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
      setUser((await meRes.json()).user);
      setRegistrations((await regRes.json()).registrations || []);
      setSettings((await settingsRes.json()).settings);
      setLoading(false);
    }
    load();
  }, []);

  const totalUnits = registrations.reduce((sum, r) => sum + (r.course?.units || 0), 0);
  const parts = user?.matricNumber?.split("/") || [];
  const [, , programme, department, year] = parts;

  if (loading) {
    return <div className="p-6 text-sm text-ink-soft sm:p-10">Loading your slip…</div>;
  }

  return (
    <div className="min-h-screen bg-paper py-6 sm:py-10">
      {/* Screen-only toolbar, hidden when printing */}
      <div className="mx-auto mb-6 flex max-w-3xl flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 print:hidden">
        <Link href="/student/registration" className="text-sm font-medium text-navy-900 hover:underline">
          ← Back to My Registration
        </Link>
        <button
          onClick={() => window.print()}
          className="rounded-md bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-800"
        >
          Print / Save as PDF
        </button>
      </div>

      {/* Printable slip */}
      <div className="mx-auto max-w-3xl bg-white p-5 shadow-sm sm:p-10 print:shadow-none">
        <div className="flex flex-col gap-3 border-b-2 border-navy-900 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-base font-semibold text-navy-900 sm:text-lg">
              Institute of Management &amp; Technology
            </p>
            <p className="text-sm text-ink-soft">Course Registration Slip</p>
          </div>
          <div className="text-left text-xs text-ink-soft sm:text-right">
            <p>{settings?.currentSession}</p>
            <p>{settings?.currentSemester}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-wide text-ink-soft">Full Name</p>
            <p className="font-medium text-ink">{user?.name}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-ink-soft">Matric Number</p>
            <p className="break-all font-medium text-ink">{user?.matricNumber}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-ink-soft">Department</p>
            <p className="font-medium text-ink">
              {department?.split("-").map((w) => w[0]?.toUpperCase() + w.slice(1)).join(" ")}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-ink-soft">Programme / Year</p>
            <p className="font-medium text-ink">{programme?.toUpperCase()} · {year}</p>
          </div>
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[420px] text-left text-sm">
            <thead>
              <tr className="border-y border-line text-xs uppercase tracking-wide text-ink-soft">
                <th className="py-2">Code</th>
                <th className="py-2">Course Title</th>
                <th className="py-2">Units</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {registrations.map((r) => (
                <tr key={r.id}>
                  <td className="py-2.5 font-medium text-ink">{r.course.code}</td>
                  <td className="py-2.5 text-ink-soft">{r.course.title}</td>
                  <td className="py-2.5 text-ink-soft">{r.course.units}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-navy-900">
                <td colSpan={2} className="py-2.5 text-right font-semibold text-navy-900">
                  Total Units
                </td>
                <td className="py-2.5 font-semibold text-navy-900">{totalUnits}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="mt-10 flex flex-col gap-1 text-xs text-ink-soft sm:flex-row sm:justify-between">
          <p>Generated on {new Date().toLocaleDateString()}</p>
          <p>Status: Confirmed</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 text-xs text-ink-soft sm:grid-cols-2 sm:gap-10">
          <div className="border-t border-line pt-2">Student&apos;s Signature</div>
          <div className="border-t border-line pt-2">Registrar&apos;s Signature</div>
        </div>
      </div>
    </div>
  );
}