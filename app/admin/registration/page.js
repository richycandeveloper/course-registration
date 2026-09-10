"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import RegistrationTable from "@/components/RegistrationTable";

export default function AdminRegistrationPage() {
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

  return (
    <div className="flex min-h-screen bg-paper">
      <Sidebar role="admin" />
      <div className="flex-1">
        <Topbar
          title="Registrations"
          subtitle={`${registrations.length} active`}
          user={user}
        />
        <main className="p-8">
          {loading ? (
            <p className="text-sm text-ink-soft">Loading…</p>
          ) : (
            <RegistrationTable registrations={registrations} role="admin" />
          )}
        </main>
      </div>
    </div>
  );
}
