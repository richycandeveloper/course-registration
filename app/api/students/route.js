import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifySession, SESSION_COOKIE_NAME } from "@/lib/auth";

// GET /api/students — admin only. Lists all students with registration counts.
export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  const session = token ? await verifySession(token) : null;

  if (!session || session.role !== "admin") {
    return NextResponse.json(
      { error: "Only an admin can view student records." },
      { status: 403 }
    );
  }

  const students = await prisma.student.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      matricNumber: true,
      department: true,
      level: true,
      year: true,
      createdAt: true,
      _count: { select: { registrations: true } },
    },
  });

  return NextResponse.json({ students });
}