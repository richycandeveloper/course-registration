import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  verifyPassword,
  signSession,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE,
  isEmail,
  normalizeMatricNumber,
} from "@/lib/auth";

// One login endpoint for both roles.
// - Input containing "@" is treated as an admin email login.
// - Anything else is treated as a student matric-number login.
export async function POST(request) {
  try {
    const body = await request.json();
    const { loginId, password } = body;

    if (!loginId || !password) {
      return NextResponse.json(
        { error: "Login ID and password are required." },
        { status: 400 }
      );
    }

    const isAdminLogin = isEmail(loginId);
    const normalizedId = isAdminLogin
      ? loginId.trim().toLowerCase()
      : normalizeMatricNumber(loginId);

    let user = null;
    let role = null;

    if (isAdminLogin) {
      user = await prisma.admin.findUnique({ where: { email: normalizedId } });
      role = "admin";
    } else {
      user = await prisma.student.findUnique({
        where: { matricNumber: normalizedId },
      });
      role = "student";
    }

    if (!user) {
      return NextResponse.json(
        { error: "No account found with these credentials." },
        { status: 401 }
      );
    }

    const passwordMatches = await verifyPassword(password, user.password);
    if (!passwordMatches) {
      return NextResponse.json(
        { error: "Incorrect password." },
        { status: 401 }
      );
    }

    const sessionPayload =
      role === "admin"
        ? { id: user.id, role, name: user.name, email: user.email }
        : {
            id: user.id,
            role,
            name: `${user.firstName} ${user.lastName}`,
            matricNumber: user.matricNumber,
          };

    const token = await signSession(sessionPayload);

    const response = NextResponse.json({
      message: "Login successful.",
      role,
      user: sessionPayload,
    });

    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE,
    });

    return response;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "Something went wrong while logging in." },
      { status: 500 }
    );
  }
}