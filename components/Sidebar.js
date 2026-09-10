"use client";

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
  { href: "/admin/registration", label: "Registrations", icon: "list" },
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
};

export default function Sidebar({ role = "student" }) {
  const pathname = usePathname();
  const links = role === "admin" ? ADMIN_LINKS : STUDENT_LINKS;

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-navy-800/40 bg-navy-900 md:flex">
      <div className="px-6 py-6">
        <Logo variant="light" />
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {links.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "bg-white/10 text-white"
                  : "text-navy-100/70 hover:bg-white/5 hover:text-white"
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
      <div className="border-t border-white/10 px-6 py-4 text-xs text-navy-100/50">
        {role === "admin" ? "Administrator access" : "Student access"}
      </div>
    </aside>
  );
}
