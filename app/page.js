import Link from "next/link";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";

const DEPARTMENTS = [
  { name: "Computer Science", code: "B.Sc" },
  { name: "Business Administration", code: "B.Sc" },
  { name: "Accountancy", code: "B.Sc" },
  { name: "Mass Communication", code: "B.Sc" },
  { name: "Estate Management", code: "B.Sc" },
  { name: "Public Administration", code: "B.Sc" },
];

const STEPS = [
  {
    title: "Create your account",
    body: "Register with your matric number in the format imt/unn/b.sc/department/year/matric-number, along with your department and level.",
  },
  {
    title: "Browse the course catalogue",
    body: "See every course offered to your department and level for the current semester, with units and descriptions.",
  },
  {
    title: "Register and track",
    body: "Add courses to your registration, drop them if your plans change, and keep a running record of your semester load.",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="border-b border-line bg-navy-900">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
          <div>
            <p className="text-sm font-medium text-gold-400">
              Institute of Management &amp; Technology
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-white md:text-5xl">
              Course registration, handled properly.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-navy-100/70">
              One portal for students to register their semester courses and
              for the registry to manage students, courses and enrolment —
              without the paperwork.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/create-account"
                className="rounded-md bg-gold-500 px-5 py-3 text-sm font-semibold text-navy-950 shadow-sm transition hover:bg-gold-400"
              >
                Create your account
              </Link>
              <Link
                href="/login"
                className="rounded-md border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
              >
                Log in
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <p className="text-xs font-medium uppercase tracking-wide text-navy-100/50">
                Current semester
              </p>
              <div className="mt-4 space-y-3">
                {[
                  ["CSC 301", "Data Structures & Algorithms", "3 units"],
                  ["CSC 305", "Database Management Systems", "3 units"],
                  ["GST 301", "Entrepreneurship Studies", "2 units"],
                ].map(([code, title, units]) => (
                  <div
                    key={code}
                    className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">{code}</p>
                      <p className="text-xs text-navy-100/60">{title}</p>
                    </div>
                    <span className="text-xs text-gold-400">{units}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section id="departments" className="mx-auto max-w-6xl px-6 py-20">
        <ScrollReveal>
          <p className="text-sm font-medium text-gold-600">Departments</p>
          <h2 className="mt-2 max-w-lg font-display text-2xl font-semibold text-navy-900 md:text-3xl">
            Registration is open across every department.
          </h2>
        </ScrollReveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DEPARTMENTS.map((dept, i) => (
            <ScrollReveal key={dept.name} delay={i * 60}>
              <div className="rounded-lg border border-line bg-white p-5 transition hover:border-navy-900/20 hover:shadow-sm">
                <p className="font-display text-base font-semibold text-navy-900">
                  {dept.name}
                </p>
                <p className="mt-1 text-sm text-ink-soft">{dept.code} Programme</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-y border-line bg-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <ScrollReveal>
            <p className="text-sm font-medium text-gold-600">How it works</p>
            <h2 className="mt-2 max-w-lg font-display text-2xl font-semibold text-navy-900 md:text-3xl">
              From account to enrolment in three steps.
            </h2>
          </ScrollReveal>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 80}>
                <div className="border-t-2 border-navy-900 pt-4">
                  <h3 className="font-display text-lg font-semibold text-navy-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {step.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Support / CTA */}
      <section id="support" className="mx-auto max-w-6xl px-6 py-20">
        <ScrollReveal>
          <div className="flex flex-col items-start justify-between gap-6 rounded-xl bg-navy-900 px-8 py-10 md:flex-row md:items-center">
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
        </ScrollReveal>
      </section>

      <footer className="border-t border-line px-6 py-8 text-center text-xs text-ink-soft">
        © {new Date().getFullYear()} Institute of Management &amp; Technology. All rights reserved.
      </footer>
    </>
  );
}
