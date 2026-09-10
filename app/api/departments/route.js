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

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const departments = await prisma.department.findMany({
    include: { faculty: true },
    orderBy: { name: "asc" },
  });

  return NextResponse.json({ departments });
}

export async function POST(request) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json(
      { error: "Only an admin can add departments." },
      { status: 403 }
    );
  }

  try {
    const { name, facultyId } = await request.json();
    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "A department name is required." },
        { status: 400 }
      );
    }

    const department = await prisma.department.create({
      data: {
        name: name.trim(),
        facultyId: facultyId ? Number(facultyId) : null,
      },
      include: { faculty: true },
    });

    return NextResponse.json({ department }, { status: 201 });
  } catch (err) {
    if (err.code === "P2002") {
      return NextResponse.json(
        { error: "This department already exists." },
        { status: 409 }
      );
    }
    console.error("Create department error:", err);
    return NextResponse.json(
      { error: "Could not create department." },
      { status: 500 }
    );
  }
}