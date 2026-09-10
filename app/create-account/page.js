"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";

const DEPARTMENTS = [
  "computer-science",
  "business-administration",
  "accountancy",
  "mass-communication",
  "estate-management",
  "public-administration",
];

const LEVELS = ["ND1", "ND2", "HND1", "HND2"];

export default function CreateAccountPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    department: DEPARTMENTS[0],
    year: new Date().getFullYear().toString(),
    matricNumberTail: "",
    level: LEVELS[0],
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const matricNumber = `imt/unn/b.sc/${form.department}/${form.year}/${form.matricNumberTail}`;

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!form.matricNumberTail.trim()) {
      setError("Please enter your matric serial number.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          matricNumber,
          department: form.department,
          level: form.level,
          year: form.year,
          password: form.password,
          confirmPassword: form.confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Could not create your account.");
        setLoading(false);
        return;
      }

      router.push("/student/dashboard");
      router.refresh();
    } catch (err) {
      setError("Something went wrong. Please check your connection.");
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <div className="hidden flex-col justify-between bg-navy-900 p-10 md:flex">
        <Logo variant="light" />
        <div>
          <p className="text-sm font-medium text-gold-400">Get started</p>
          <h1 className="mt-3 max-w-sm font-display text-3xl font-semibold leading-tight text-white">
            Create your student account to register this semester&apos;s courses.
          </h1>
          <p className="mt-4 max-w-sm text-sm text-navy-100/60">
            Your matric number is built from your department, admission year
            and serial number, in the format used by the registry.
          </p>
        </div>
        <p className="text-xs text-navy-100/40">
          © {new Date().getFullYear()} Institute of Management &amp; Technology
        </p>
      </div>

      <div className="flex items-center justify-center bg-paper px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-6 md:hidden">
            <Logo />
          </div>

          <h2 className="font-display text-2xl font-semibold text-navy-900">
            Create your account
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            This account gives you access to course registration each semester.
          </p>

          {error && (
            <div className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-ink">First name</label>
                <input
                  required
                  value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  className="mt-1.5 w-full rounded-md border border-line px-3.5 py-2.5 text-sm outline-none transition focus:border-navy-700 focus:ring-2 focus:ring-navy-700/10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink">Last name</label>
                <input
                  required
                  value={form.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  className="mt-1.5 w-full rounded-md border border-line px-3.5 py-2.5 text-sm outline-none transition focus:border-navy-700 focus:ring-2 focus:ring-navy-700/10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink">Department</label>
              <select
                value={form.department}
                onChange={(e) => update("department", e.target.value)}
                className="mt-1.5 w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-navy-700 focus:ring-2 focus:ring-navy-700/10"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept
                      .split("-")
                      .map((w) => w[0].toUpperCase() + w.slice(1))
                      .join(" ")}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-ink">Level</label>
                <select
                  value={form.level}
                  onChange={(e) => update("level", e.target.value)}
                  className="mt-1.5 w-full rounded-md border border-line bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-navy-700 focus:ring-2 focus:ring-navy-700/10"
                >
                  {LEVELS.map((lvl) => (
                    <option key={lvl} value={lvl}>{lvl}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-ink">Admission year</label>
                <input
                  required
                  value={form.year}
                  onChange={(e) => update("year", e.target.value)}
                  className="mt-1.5 w-full rounded-md border border-line px-3.5 py-2.5 text-sm outline-none transition focus:border-navy-700 focus:ring-2 focus:ring-navy-700/10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-ink">
                Matric serial number
              </label>
              <input
                required
                value={form.matricNumberTail}
                onChange={(e) => update("matricNumberTail", e.target.value)}
                placeholder="12345"
                className="mt-1.5 w-full rounded-md border border-line px-3.5 py-2.5 text-sm outline-none transition focus:border-navy-700 focus:ring-2 focus:ring-navy-700/10"
              />
              <p className="mt-1.5 truncate rounded bg-navy-900/5 px-2.5 py-1.5 text-xs text-ink-soft">
                {matricNumber}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-ink">Password</label>
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  className="mt-1.5 w-full rounded-md border border-line px-3.5 py-2.5 text-sm outline-none transition focus:border-navy-700 focus:ring-2 focus:ring-navy-700/10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ink">Confirm password</label>
                <input
                  type="password"
                  required
                  value={form.confirmPassword}
                  onChange={(e) => update("confirmPassword", e.target.value)}
                  className="mt-1.5 w-full rounded-md border border-line px-3.5 py-2.5 text-sm outline-none transition focus:border-navy-700 focus:ring-2 focus:ring-navy-700/10"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-navy-900 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-soft">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-navy-900 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}