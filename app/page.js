import Link from "next/link";
import Logo from "@/components/Logo";
import AOSInit from "@/components/AOSInit";

const QUICK_LINKS = [
  { title: "Student Login", desc: "Register courses, view results, print slips.", href: "/login", icon: "user" },
  { title: "Create Account", desc: "New students start here with your matric number.", href: "/create-account", icon: "add" },
  { title: "Admin Portal", desc: "Registry staff manage students and courses.", href: "/login", icon: "shield" },
  { title: "Academic Calendar", desc: "Session dates and registration windows.", href: "#announcements", icon: "calendar" },
];

const ANNOUNCEMENTS = [
  {
    tag: "Registration",
    title: "First Semester course registration is now open",
    date: "Sept 2026",
    body: "All returning and newly admitted students are to complete course registration before the published deadline.",
  },
  {
    tag: "Academic",
    title: "2025/2026 academic calendar released",
    date: "Aug 2026",
    body: "Departments should note resumption dates, examination periods and semester breaks.",
  },
  {
    tag: "Notice",
    title: "Matric number format for new intake",
    date: "Aug 2026",
    body: "New students must use the format imt/unn/programme/department/year/serial when creating their account.",
  },
];

const DEPARTMENTS = [
  "Computer Science",
  "Business Administration",
  "Accountancy",
  "Mass Communication",
  "Estate Management",
  "Public Administration",
];

const STATS = [
  { value: "6", label: "Departments" },
  { value: "50+", label: "Courses" },
  { value: "2", label: "Semesters" },
  { value: "1965", label: "Established" },
];

const ICONS = {
  user: <path d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 20a8 8 0 0116 0" />,
  add: <path d="M12 5v14M5 12h14" />,
  shield: <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z" />,
  calendar: <path d="M7 3v3M17 3v3M4 8h16M5 6h14a1 1 0 011 1v12a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1z" />,
};

export default function Home() {
  return (
    <>
      <AOSInit />

      {/* Utility bar */}
      <div className="bg-navy-950 px-6 py-2 text-xs text-navy-100/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <span>Institute of Management &amp; Technology, Enugu — in affiliation with UNN</span>
          <div className="hidden gap-4 sm:flex">
            <a href="#" className="hover:text-white">Contact</a>
            <a href="#" className="hover:text-white">About</a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header className="sticky top-0 z-40 border-b border-line bg-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Logo />
          <div className="hidden items-center gap-8 text-sm font-medium text-ink-soft md:flex">
            <a href="#quick-links" className="transition hover:text-navy-900">Portal</a>
            <a href="#announcements" className="transition hover:text-navy-900">Announcements</a>
            <a href="#departments" className="transition hover:text-navy-900">Departments</a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-md px-4 py-2 text-sm font-medium text-navy-900 transition hover:bg-navy-900/5"
            >
              Log in
            </Link>
            <Link
              href="/create-account"
              className="rounded-md bg-navy-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-navy-800"
            >
              Create account
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero banner */}
      <section className="relative border-b-4 border-gold-500 bg-navy-900">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div data-aos="fade-up" className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
              Official Course Registration Portal
            </p>
            <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-white md:text-5xl">
              Institute of Management &amp; Technology
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-navy-100/80">
              Register your semester courses, track your registration status,
              and manage your academic record — all in one official portal
              for students and the registry.
            </p>
          </div>
        </div>
      </section>

      {/* Quick access panel — overlapping the hero, typical of institutional portals */}
      <section id="quick-links" className="relative mx-auto -mt-10 max-w-6xl px-6">
        <div data-aos="fade-up" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {QUICK_LINKS.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="group rounded-lg border border-line bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-navy-900/30 hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-navy-900/5 text-navy-800 transition group-hover:bg-navy-900 group-hover:text-gold-400">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {ICONS[link.icon]}
                </svg>
              </div>
              <p className="mt-3 font-display text-sm font-semibold text-navy-900">
                {link.title}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                {link.desc}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats strip */}
      <section className="mx-auto mt-16 max-w-6xl px-6">
        <div
          data-aos="fade-up"
          className="grid grid-cols-2 divide-x divide-line rounded-lg border border-line bg-white sm:grid-cols-4"
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="px-4 py-6 text-center">
              <p className="font-display text-2xl font-semibold text-navy-900 md:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-ink-soft">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Announcements */}
      <section id="announcements" className="mx-auto max-w-6xl px-6 py-20">
        <div data-aos="fade-up" className="flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">
              Announcements
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-navy-900 md:text-3xl">
              Latest from the registry
            </h2>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {ANNOUNCEMENTS.map((item, i) => (
            <article
              key={item.title}
              data-aos="fade-up"
              data-aos-delay={i * 90}
              className="flex flex-col rounded-lg border border-line bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-navy-900/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-navy-800">
                  {item.tag}
                </span>
                <span className="text-xs text-ink-soft">{item.date}</span>
              </div>
              <h3 className="mt-3 font-display text-base font-semibold leading-snug text-navy-900">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">
                {item.body}
              </p>
              <span className="mt-4 text-xs font-semibold text-navy-900">
                Read more →
              </span>
            </article>
          ))}
        </div>
      </section>

      {/* Departments */}
      <section id="departments" className="border-y border-line bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div data-aos="fade-up">
            <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">
              Departments
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-navy-900 md:text-3xl">
              Programmes offered
            </h2>
          </div>
          <div data-aos="fade-up" data-aos-delay="100" className="mt-8 flex flex-wrap gap-3">
            {DEPARTMENTS.map((dept) => (
              <span
                key={dept}
                className="rounded-full border border-line bg-paper px-4 py-2 text-sm font-medium text-navy-900"
              >
                {dept}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div
          data-aos="fade-up"
          className="flex flex-col items-start justify-between gap-6 rounded-lg border-l-4 border-gold-500 bg-navy-900 px-8 py-10 md:flex-row md:items-center"
        >
          <div>
            <h2 className="font-display text-xl font-semibold text-white md:text-2xl">
              Ready to register for this semester?
            </h2>
            <p className="mt-2 text-sm text-navy-100/70">
              Students and administrators both sign in from the same page.
            </p>
          </div>
          <Link
            href="/login"
            className="shrink-0 rounded-md bg-gold-500 px-5 py-3 text-sm font-semibold text-navy-950 transition hover:bg-gold-400"
          >
            Go to login
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line bg-navy-950">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div>
              <Logo variant="light" />
              <p className="mt-3 max-w-xs text-xs leading-relaxed text-navy-100/50">
                A state-owned institution offering technical and professional
                education, in affiliation with the University of Nigeria, Nsukka.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-navy-100/50">
                Portal
              </p>
              <div className="mt-3 flex flex-col gap-2 text-sm text-navy-100/70">
                <Link href="/login" className="hover:text-white">Student login</Link>
                <Link href="/create-account" className="hover:text-white">Create account</Link>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-navy-100/50">
                Contact
              </p>
              <p className="mt-3 text-sm text-navy-100/70">37 Old Enugu Road, Enugu</p>
              <p className="text-sm text-navy-100/70">support@imt.edu.ng</p>
            </div>
          </div>
          <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-navy-100/40">
            © {new Date().getFullYear()} Institute of Management &amp; Technology, Enugu. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}