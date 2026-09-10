"use client";

export default function CourseCard({ course, isRegistered, onRegister, onDrop, busy }) {
  return (
    <div className="flex flex-col justify-between rounded-lg border border-line bg-white p-5 transition hover:border-navy-900/20 hover:shadow-sm">
      <div>
        <div className="flex items-start justify-between gap-3">
          <span className="rounded-md bg-navy-900/5 px-2.5 py-1 text-xs font-semibold tracking-wide text-navy-800">
            {course.code}
          </span>
          <span className="text-xs font-medium text-ink-soft">
            {course.units} unit{course.units === 1 ? "" : "s"}
          </span>
        </div>
        <h3 className="mt-3 font-display text-base font-semibold text-navy-900">
          {course.title}
        </h3>
        {course.description && (
          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
            {course.description}
          </p>
        )}
        <p className="mt-3 text-xs text-ink-soft">
          {course.department} · {course.level} Level · {course.semester}
        </p>
      </div>

      <button
        disabled={busy}
        onClick={() => (isRegistered ? onDrop(course.id) : onRegister(course.id))}
        className={`mt-5 w-full rounded-md py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${
          isRegistered
            ? "border border-red-200 text-red-600 hover:bg-red-50"
            : "bg-navy-900 text-white hover:bg-navy-800"
        }`}
      >
        {busy ? "Please wait…" : isRegistered ? "Drop course" : "Register"}
      </button>
    </div>
  );
}
