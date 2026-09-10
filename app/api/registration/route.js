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

// GET /api/registration
// Student: returns their own registrations.
// Admin: returns all registrations (with student + course info).
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  if (session.role === "admin") {
    const registrations = await prisma.registration.findMany({
      where: { status: "Registered" },
      include: { student: true, course: true },
      orderBy: { registeredAt: "desc" },
    });
    return NextResponse.json({ registrations });
  }

  const registrations = await prisma.registration.findMany({
    where: { studentId: session.id, status: "Registered" },
    include: { course: true },
    orderBy: { registeredAt: "desc" },
  });

  return NextResponse.json({ registrations });
}

// POST /api/registration — student registers for a course
export async function POST(request) {
  const session = await getSession();
  if (!session || session.role !== "student") {
    return NextResponse.json(
      { error: "Only students can register for courses." },
      { status: 403 }
    );
  }

  try {
    const settings =
      (await prisma.setting.findFirst()) ||
      (await prisma.setting.create({ data: {} }));

    if (!settings.registrationOpen) {
      return NextResponse.json(
        { error: "Course registration is currently closed." },
        { status: 403 }
      );
    }

    const { courseId } = await request.json();
    if (!courseId) {
      return NextResponse.json(
        { error: "A course must be specified." },
        { status: 400 }
      );
    }

    const existing = await prisma.registration.findUnique({
      where: {
        studentId_courseId: { studentId: session.id, courseId: Number(courseId) },
      },
    });

    if (existing && existing.status === "Registered") {
      return NextResponse.json(
        { error: "You are already registered for this course." },
        { status: 409 }
      );
    }

    const registration = existing
      ? await prisma.registration.update({
          where: { id: existing.id },
          data: {
            status: "Registered",
            registeredAt: new Date(),
            session: settings.currentSession,
            semester: settings.currentSemester,
          },
          include: { course: true },
        })
      : await prisma.registration.create({
          data: {
            studentId: session.id,
            courseId: Number(courseId),
            session: settings.currentSession,
            semester: settings.currentSemester,
          },
          include: { course: true },
        });

    return NextResponse.json({ registration }, { status: 201 });
  } catch (err) {
    console.error("Register course error:", err);
    return NextResponse.json(
      { error: "Something went wrong while registering for this course." },
      { status: 500 }
    );
  }
}

// DELETE /api/registration?courseId= — student drops a course
export async function DELETE(request) {
  const session = await getSession();
  if (!session || session.role !== "student") {
    return NextResponse.json(
      { error: "Only students can drop courses." },
      { status: 403 }
    );
  }

  const { searchParams } = new URL(request.url);
  const courseId = searchParams.get("courseId");

  if (!courseId) {
    return NextResponse.json(
      { error: "A course must be specified." },
      { status: 400 }
    );
  }

  try {
    await prisma.registration.updateMany({
      where: { studentId: session.id, courseId: Number(courseId) },
      data: { status: "Dropped" },
    });
    return NextResponse.json({ message: "Course dropped." });
  } catch (err) {
    console.error("Drop course error:", err);
    return NextResponse.json(
      { error: "Could not drop this course." },
      { status: 500 }
    );
  }
}