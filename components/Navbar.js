import Link from "next/link";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/">
          <Logo />
        </Link>
        <div className="hidden items-center gap-8 text-sm font-medium text-ink-soft md:flex">
          <a href="#departments" className="transition hover:text-navy-900">
            Departments
          </a>
          <a href="#how-it-works" className="transition hover:text-navy-900">
            How it works
          </a>
          <a href="#support" className="transition hover:text-navy-900">
            Support
          </a>
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
  );
}
