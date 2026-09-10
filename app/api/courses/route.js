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

// GET /api/courses?department=&level=
// Returns courses, optionally filtered. Available to any logged-in user.
export async function GET(request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const department = searchParams.get("department");
  const level = searchParams.get("level");

  const courses = await prisma.course.findMany({
    where: {
      ...(department ? { department } : {}),
      ...(level ? { level } : {}),
    },
    orderBy: { code: "asc" },
  });

  return NextResponse.json({ courses });
}

// POST /api/courses — admin only. Creates a new course.
export async function POST(request) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json(
      { error: "Only an admin can create courses." },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const { code, title, description, units, department, level, semester } =
      body;

    if (!code || !title || !department || !level) {
      return NextResponse.json(
        { error: "Code, title, department and level are required." },
        { status: 400 }
      );
    }

    const course = await prisma.course.create({
      data: {
        code: code.trim().toUpperCase(),
        title: title.trim(),
        description: description?.trim() || null,
        units: units ? Number(units) : 3,
        department: department.trim(),
        level: level.trim(),
        semester: semester?.trim() || "First Semester",
      },
    });

    return NextResponse.json({ course }, { status: 201 });
  } catch (err) {
    console.error("Create course error:", err);
    if (err.code === "P2002") {
      return NextResponse.json(
        { error: "A course with this code already exists." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Something went wrong while creating the course." },
      { status: 500 }
    );
  }
}