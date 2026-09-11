import Link from "next/link";
import Navbar from "@/components/Navbar";
import AOSInit from "@/components/AOSInit";

const DEPARTMENTS = [
  { name: "Computer Science", code: "B.Sc" },
  { name: "Business Administration", code: "B.Sc" },
  { name: "Accountancy", code: "B.Sc" },
  { name: "Mass Communication", code: "B.Sc" },
  { name: "Estate Management", code: "B.Sc" },
  { name: "Public Administration", code: "B.Sc" },
];

const STATS = [
  { value: "6", label: "Departments" },
  { value: "50+", label: "Courses offered" },
  { value: "2", label: "Semesters tracked" },
  { value: "100%", label: "Digital registration" },
];

const FEATURES = [
  {
    title: "One matric number, one login",
    body: "Students sign in with their official matric number — no separate usernames or passwords to remember.",
    icon: "key",
  },
  {
    title: "Real-time course catalogue",
    body: "The registry publishes courses per department and level; students see updates the moment they're added.",
    icon: "book",
  },
  {
    title: "Printable registration slip",
    body: "Every confirmed registration generates an official slip with units, session and semester — ready to print.",
    icon: "doc",
  },
  {
    title: "Registration windows, controlled",
    body: "Admins open and close registration on their own schedule; students see exactly when it's live.",
    icon: "clock",
  },
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

const ICONS = {
  key: <path d="M15 7a4 4 0 11-4 4M11 11L3 19v2h2l1-1h2v-2h2l2-2M15 7l4-4M17 9l2-2" />,
  book: <path d="M5 4h9a3 3 0 013 3v13H8a3 3 0 00-3 3V4z" />,
  doc: <path d="M7 3h7l5 5v13H7V3zM14 3v5h5M9 13h6M9 17h6" />,
  clock: <path d="M12 8v4l3 2M20 12a8 8 0 11-16 0 8 8 0 0116 0z" />,
};

export default function Home() {
  return (
    <>
      <AOSInit />
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-navy-900">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
          <div data-aos="fade-right">
            <p className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold-400">
              Institute of Management &amp; Technology
            </p>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-white md:text-5xl">
              Course registration,<br />handled properly.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-navy-100/70">
              One portal for students to register their semester courses and
              for the registry to manage students, courses and enrolment —
              without the paperwork.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/create-account"
                className="group inline-flex items-center gap-2 rounded-md bg-gold-500 px-5 py-3 text-sm font-semibold text-navy-950 shadow-sm transition hover:bg-gold-400"
              >
                Create your account
                <span className="transition group-hover:translate-x-0.5">→</span>
              </Link>
              <Link
                href="/login"
                className="rounded-md border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
              >
                Log in
              </Link>
            </div>
          </div>

          <div data-aos="fade-left" data-aos-delay="100" className="relative">
            <div className="absolute -inset-3 -z-10 rounded-2xl bg-gold-500/10 blur-2xl" />
            <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wide text-navy-100/50">
                  Current semester
                </p>
                <span className="rounded-full bg-green-500/15 px-2 py-0.5 text-[10px] font-semibold text-green-400">
                  Registration open
                </span>
              </div>
              <div className="mt-4 space-y-3">
                {[
                  ["CSC 301", "Data Structures & Algorithms", "3 units"],
                  ["CSC 305", "Database Management Systems", "3 units"],
                  ["GST 301", "Entrepreneurship Studies", "2 units"],
                ].map(([code, title, units]) => (
                  <div
                    key={code}
                    className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3 transition hover:bg-white/10"
                  >
                    <div>
                      <p className="text-sm font-semibold text-white">{code}</p>
                      <p className="text-xs text-navy-100/60">{title}</p>
                    </div>
                    <span className="text-xs font-medium text-gold-400">{units}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-xs text-navy-100/50">
                <span>Total units</span>
                <span className="font-display text-base font-semibold text-white">8</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="relative border-t border-white/10 bg-navy-950/40">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-6 py-8 md:grid-cols-4">
            {STATS.map((stat, i) => (
              <div key={stat.label} data-aos="fade-up" data-aos-delay={i * 80}>
                <p className="font-display text-2xl font-semibold text-white md:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-navy-100/60">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div data-aos="fade-up">
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">
            Built for the registry
          </p>
          <h2 className="mt-2 max-w-xl font-display text-2xl font-semibold text-navy-900 md:text-3xl">
            Everything registration needs, nothing it doesn&apos;t.
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <div
              key={feature.title}
              data-aos="fade-up"
              data-aos-delay={i * 90}
              className="group rounded-xl border border-line bg-white p-6 transition hover:-translate-y-1 hover:border-navy-900/20 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-navy-900 text-gold-400 transition group-hover:bg-gold-500 group-hover:text-navy-950">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {ICONS[feature.icon]}
                </svg>
              </div>
              <h3 className="mt-4 font-display text-base font-semibold text-navy-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {feature.body}
              </p>
            </div>
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
            <h2 className="mt-2 max-w-lg font-display text-2xl font-semibold text-navy-900 md:text-3xl">
              Registration is open across every department.
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {DEPARTMENTS.map((dept, i) => (
              <div
                key={dept.name}
                data-aos="zoom-in"
                data-aos-delay={i * 60}
                className="flex items-center justify-between rounded-lg border border-line bg-paper p-5 transition hover:border-gold-500/40 hover:bg-white hover:shadow-sm"
              >
                <div>
                  <p className="font-display text-base font-semibold text-navy-900">
                    {dept.name}
                  </p>
                  <p className="mt-1 text-sm text-ink-soft">{dept.code} Programme</p>
                </div>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-900/5 text-sm font-semibold text-navy-800">
                  →
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-20">
        <div data-aos="fade-up">
          <p className="text-sm font-semibold uppercase tracking-wide text-gold-600">
            How it works
          </p>
          <h2 className="mt-2 max-w-lg font-display text-2xl font-semibold text-navy-900 md:text-3xl">
            From account to enrolment in three steps.
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <div key={step.title} data-aos="fade-up" data-aos-delay={i * 100} className="relative pl-14">
              <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-navy-900 font-display text-sm font-semibold text-gold-400">
                {i + 1}
              </span>
              <h3 className="font-display text-lg font-semibold text-navy-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Support / CTA */}
      <section id="support" className="mx-auto max-w-6xl px-6 pb-20">
        <div
          data-aos="zoom-in"
          className="relative overflow-hidden rounded-2xl bg-navy-900 px-8 py-12 md:px-12"
        >
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gold-500/20 blur-3xl"
          />
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
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
        </div>
      </section>

      <footer className="border-t border-line px-6 py-8 text-center text-xs text-ink-soft">
        © {new Date().getFullYear()} Institute of Management &amp; Technology. All rights reserved.
      </footer>
    </>
  );
}