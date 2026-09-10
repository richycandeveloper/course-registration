import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  hashPassword,
  signSession,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE,
  normalizeMatricNumber,
} from "@/lib/auth";

// Student self-registration. Admins are not created through this endpoint.
export async function POST(request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      matricNumber,
      department,
      level,
      year,
      password,
      confirmPassword,
    } = body;

    if (
      !firstName ||
      !lastName ||
      !matricNumber ||
      !department ||
      !level ||
      !year ||
      !password ||
      !confirmPassword
    ) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    const normalizedMatric = normalizeMatricNumber(matricNumber);

    const existing = await prisma.student.findUnique({
      where: { matricNumber: normalizedMatric },
    });

    if (existing) {
      return NextResponse.json(
        { error: "An account with this matric number already exists." },
        { status: 409 }
      );
    }

    const hashed = await hashPassword(password);

    const student = await prisma.student.create({
      data: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        matricNumber: normalizedMatric,
        department: department.trim(),
        level: level.trim(),
        year: year.trim(),
        password: hashed,
      },
    });

    // Log the student in immediately after account creation
    const sessionPayload = {
      id: student.id,
      role: "student",
      name: `${student.firstName} ${student.lastName}`,
      matricNumber: student.matricNumber,
    };
    const token = await signSession(sessionPayload);

    const response = NextResponse.json(
      {
        message: "Account created successfully.",
        role: "student",
        user: sessionPayload,
      },
      { status: 201 }
    );

    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE,
    });

    return response;
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json(
      { error: "Something went wrong while creating your account." },
      { status: 500 }
    );
  }
}