"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const STUDENT_LINKS = [
  { href: "/student/dashboard", label: "Dashboard", icon: "grid" },
  { href: "/student/courses", label: "Course Catalogue", icon: "book" },
  { href: "/student/registration", label: "My Registration", icon: "list" },
  { href: "/student/profile", label: "Profile", icon: "user" },
];

const ADMIN_LINKS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "grid" },
  { href: "/admin/students", label: "Students", icon: "user" },
  { href: "/admin/courses", label: "Courses", icon: "book" },
  { href: "/admin/departments", label: "Faculties & Depts", icon: "building" },
  { href: "/admin/registration", label: "Registrations", icon: "list" },
  { href: "/admin/reports", label: "Reports", icon: "chart" },
  { href: "/admin/settings", label: "Settings", icon: "settings" },
];

const ICONS = {
  grid: (
    <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" />
  ),
  book: (
    <path d="M5 4h9a3 3 0 013 3v13H8a3 3 0 00-3 3V4z" />
  ),
  list: <path d="M5 6h14M5 12h14M5 18h9" />,
  user: (
    <path d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 20a8 8 0 0116 0" />
  ),
  building: (
    <path d="M4 21V7l8-4 8 4v14M9 21v-6h6v6M4 21h16" />
  ),
  chart: <path d="M4 20V10m6 10V4m6 16v-7" />,
  settings: (
    <path d="M12 15a3 3 0 100-6 3 3 0 000 6zM4.5 12a7.5 7.5 0 01.4-2.4l-1.8-1.4 1.5-2.6 2.1.7a7.5 7.5 0 012.1-1.2L9.2 3h3.6l.4 2.1a7.5 7.5 0 012.1 1.2l2.1-.7 1.5 2.6-1.8 1.4c.2.8.4 1.6.4 2.4s-.2 1.6-.4 2.4l1.8 1.4-1.5 2.6-2.1-.7a7.5 7.5 0 01-2.1 1.2L12.8 21H9.2l-.4-2.1a7.5 7.5 0 01-2.1-1.2l-2.1.7-1.5-2.6 1.8-1.4A7.5 7.5 0 014.5 12z" />
  ),
};

function NavLinks({ links, pathname, onNavigate }) {
  return (
    <nav className="flex-1 space-y-1 px-3">
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onNavigate}
            className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-white transition ${
              active
                ? "bg-white/15 opacity-100"
                : "opacity-70 hover:bg-white/10 hover:opacity-100"
            }`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {ICONS[link.icon]}
            </svg>
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function Sidebar({ role = "student" }) {
  const pathname = usePathname();
  const links = role === "admin" ? ADMIN_LINKS : STUDENT_LINKS;
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar with hamburger — only visible below md */}
      <div className="flex items-center justify-between border-b border-line bg-navy-900 px-4 py-3 md:hidden">
        <Logo variant="light" />
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="flex h-9 w-9 items-center justify-center rounded-md text-white hover:bg-white/10"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile slide-in overlay menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-72 flex-col bg-navy-900 shadow-xl">
            <div className="flex items-center justify-between px-6 py-6">
              <Logo variant="light" />
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="flex h-8 w-8 items-center justify-center rounded-md text-white hover:bg-white/10"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <NavLinks links={links} pathname={pathname} onNavigate={() => setMobileOpen(false)} />
            <div className="border-t border-white/10 px-6 py-4 text-xs text-white/50">
              {role === "admin" ? "Administrator access" : "Student access"}
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar — unchanged from before */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-navy-800/40 bg-navy-900 md:flex">
        <div className="px-6 py-6">
          <Logo variant="light" />
        </div>
        <NavLinks links={links} pathname={pathname} />
        <div className="border-t border-white/10 px-6 py-4 text-xs text-white/50">
          {role === "admin" ? "Administrator access" : "Student access"}
        </div>
      </aside>
    </>
  );
}