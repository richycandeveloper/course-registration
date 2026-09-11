export default function RegistrationTable({ registrations, role = "student", onDrop }) {
  if (!registrations || registrations.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-line bg-white px-6 py-12 text-center">
        <p className="text-sm text-ink-soft">
          {role === "admin"
            ? "No registrations have been recorded yet."
            : "You haven't registered for any courses yet."}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-white">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="bg-navy-900/5 text-xs font-semibold uppercase tracking-wide text-ink-soft">
          <tr>
            {role === "admin" && <th className="px-5 py-3">Student</th>}
            {role === "admin" && <th className="px-5 py-3">Matric No.</th>}
            <th className="px-5 py-3">Course</th>
            <th className="px-5 py-3">Units</th>
            <th className="px-5 py-3">Registered</th>
            {role === "student" && <th className="px-5 py-3 text-right">Action</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {registrations.map((reg) => (
            <tr key={reg.id}>
              {role === "admin" && (
                <td className="px-5 py-3.5 font-medium text-ink">
                  {reg.student?.firstName} {reg.student?.lastName}
                </td>
              )}
              {role === "admin" && (
                <td className="px-5 py-3.5 text-ink-soft">
                  {reg.student?.matricNumber}
                </td>
              )}
              <td className="px-5 py-3.5">
                <p className="font-medium text-ink">{reg.course?.code}</p>
                <p className="text-xs text-ink-soft">{reg.course?.title}</p>
              </td>
              <td className="px-5 py-3.5 text-ink-soft">{reg.course?.units}</td>
              <td className="px-5 py-3.5 text-ink-soft">
                {new Date(reg.registeredAt).toLocaleDateString()}
              </td>
              {role === "student" && (
                <td className="px-5 py-3.5 text-right">
                  <button
                    onClick={() => onDrop(reg.course.id)}
                    className="text-xs font-medium text-red-600 hover:underline"
                  >
                    Drop
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}