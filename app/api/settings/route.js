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

// Ensures exactly one settings row always exists, creating a default
// one the first time it's requested.
async function getOrCreateSettings() {
  let settings = await prisma.setting.findFirst();
  if (!settings) {
    settings = await prisma.setting.create({ data: {} });
  }
  return settings;
}

// GET /api/settings — available to any logged-in user (students need to see
// the current session/semester and whether registration is open).
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const settings = await getOrCreateSettings();
  return NextResponse.json({ settings });
}

// PUT /api/settings — admin only. Updates session/semester and registration status.
export async function PUT(request) {
  const session = await getSession();
  if (!session || session.role !== "admin") {
    return NextResponse.json(
      { error: "Only an admin can change these settings." },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const { currentSession, currentSemester, registrationOpen } = body;

    const existing = await getOrCreateSettings();

    const updated = await prisma.setting.update({
      where: { id: existing.id },
      data: {
        ...(currentSession !== undefined ? { currentSession } : {}),
        ...(currentSemester !== undefined ? { currentSemester } : {}),
        ...(registrationOpen !== undefined ? { registrationOpen } : {}),
      },
    });

    return NextResponse.json({ settings: updated });
  } catch (err) {
    console.error("Update settings error:", err);
    return NextResponse.json(
      { error: "Could not update settings." },
      { status: 500 }
    );
  }
}