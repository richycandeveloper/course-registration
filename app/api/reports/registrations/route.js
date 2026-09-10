import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifySession, SESSION_COOKIE_NAME } from "@/lib/auth";

async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySession(token);
}

function toCsvValue(value) {
  const str = String(value ?? "");
  return `"${str.replace(/"/g, '""')}"`;
}

// GET /api/reports/registrations — admin only.
// Returns a downloadable CSV of every active registration.
export async function GET() {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json(
      { error: "Only an admin can generate reports." },
      { status: 403 }
    );
  }

  const registrations = await prisma.registration.findMany({
    where: { status: "Registered" },
    include: { student: true, course: true },
    orderBy: [{ student: { lastName: "asc" } }],
  });

  const header = [
    "Matric Number",
    "First Name",
    "Last Name",
    "Department",
    "Level",
    "Course Code",
    "Course Title",
    "Units",
    "Session",
    "Semester",
    "Registered On",
  ];

  const rows = registrations.map((r) => [
    r.student.matricNumber,
    r.student.firstName,
    r.student.lastName,
    r.student.department,
    r.student.level,
    r.course.code,
    r.course.title,
    r.course.units,
    r.session,
    r.semester,
    new Date(r.registeredAt).toLocaleDateString(),
  ]);

  const csv = [header, ...rows]
    .map((row) => row.map(toCsvValue).join(","))
    .join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename="registration-report-${Date.now()}.csv"`,
    },
  });
}