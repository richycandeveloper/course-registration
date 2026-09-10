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

  const faculties = await prisma.faculty.findMany({
    include: { departments: true },
    orderBy: { name: "asc" },
  });

  return NextResponse.json({ faculties });
}

export async function POST(request) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json(
      { error: "Only an admin can add faculties." },
      { status: 403 }
    );
  }

  try {
    const { name } = await request.json();
    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "A faculty name is required." },
        { status: 400 }
      );
    }

    const faculty = await prisma.faculty.create({
      data: { name: name.trim() },
    });

    return NextResponse.json({ faculty }, { status: 201 });
  } catch (err) {
    if (err.code === "P2002") {
      return NextResponse.json(
        { error: "This faculty already exists." },
        { status: 409 }
      );
    }
    console.error("Create faculty error:", err);
    return NextResponse.json(
      { error: "Could not create faculty." },
      { status: 500 }
    );
  }
}