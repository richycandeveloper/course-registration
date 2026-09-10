"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function LoginPage() {
  const router = useRouter();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ loginId, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed. Please try again.");
        setLoading(false);
        return;
      }

      router.push(data.role === "admin" ? "/admin/dashboard" : "/student/dashboard");
      router.refresh();
    } catch (err) {
      setError("Something went wrong. Please check your connection.");
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      {/* Brand panel */}
      <div className="hidden flex-col justify-between bg-navy-900 p-10 md:flex">
        <Logo variant="light" />
        <div>
          <p className="text-sm font-medium text-gold-400">Welcome back</p>
          <h1 className="mt-3 max-w-sm font-display text-3xl font-semibold leading-tight text-white">
            Sign in to manage your semester registration.
          </h1>
          <p className="mt-4 max-w-sm text-sm text-navy-100/60">
            Students sign in with their matric number. Administrators sign in
            with their institutional email.
          </p>
        </div>
        <p className="text-xs text-navy-100/40">
          © {new Date().getFullYear()} Institute of Management &amp; Technology
        </p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-paper px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 md:hidden">
            <Logo />
          </div>

          <h2 className="font-display text-2xl font-semibold text-navy-900">
            Log in
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            Enter your matric number or admin email to continue.
          </p>

          {error && (
            <div className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-ink">
                Matric number or email
              </label>
              <input
                type="text"
                required
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                placeholder="imt/unn/b.sc/computer-science/2023/12345"
                className="mt-1.5 w-full rounded-md border border-line px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-navy-700 focus:ring-2 focus:ring-navy-700/10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-ink">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1.5 w-full rounded-md border border-line px-3.5 py-2.5 text-sm text-ink outline-none transition focus:border-navy-700 focus:ring-2 focus:ring-navy-700/10"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-navy-900 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Log in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-ink-soft">
            Don&apos;t have an account?{" "}
            <Link href="/create-account" className="font-medium text-navy-900 hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
