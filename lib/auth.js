import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "dev-only-fallback-secret-change-me";
const encodedSecret = new TextEncoder().encode(JWT_SECRET);
const TOKEN_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

export async function hashPassword(plainPassword) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plainPassword, salt);
}

export async function verifyPassword(plainPassword, hashedPassword) {
  return bcrypt.compare(plainPassword, hashedPassword);
}

// payload should include: { id, role: "student" | "admin", name, ...extra }
export async function signSession(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${TOKEN_MAX_AGE_SECONDS}s`)
    .sign(encodedSecret);
}

export async function verifySession(token) {
  try {
    const { payload } = await jwtVerify(token, encodedSecret);
    return payload;
  } catch (err) {
    return null;
  }
}

export const SESSION_COOKIE_NAME = "irp_session";
export const SESSION_MAX_AGE = TOKEN_MAX_AGE_SECONDS;

export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((value || "").trim());
}

// Normalizes a matric number for storage/lookup so minor formatting
// differences (extra spaces, stray spaces around slashes, mixed case)
// don't cause login to fail against an otherwise-matching account.
export function normalizeMatricNumber(value) {
  return (value || "")
    .trim()
    .toLowerCase()
    .replace(/\s*\/\s*/g, "/"); // remove any spaces around slashes
}