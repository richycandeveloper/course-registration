"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import CourseCard from "@/components/CourseCard";

export default function StudentCoursesPage() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [registeredIds, setRegisteredIds] = useState(new Set());
  const [settings, setSettings] = useState(null);
  const [busyId, setBusyId] = useState(null);
  const [message, setMessage] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [loading, setLoading] = useState(true);

  async function loadAll() {
    const [meRes, coursesRes, regRes, settingsRes] = await Promise.all([
      fetch("/api/auth/me"),
      fetch("/api/courses"),
      fetch("/api/registration"),
      fetch("/api/settings"),
    ]);
    const me = await meRes.json();
    const coursesData = await coursesRes.json();
    const regData = await regRes.json();
    const settingsData = await settingsRes.json();

    setUser(me.user);
    setCourses(coursesData.courses || []);
    setRegisteredIds(
      new Set((regData.registrations || []).map((r) => r.course.id))
    );
    setSettings(settingsData.settings);
    setLoading(false);
  }

  useEffect(() => {
    loadAll();
  }, []);

  async function handleRegister(courseId) {
    setBusyId(courseId);
    setMessage("");
    setConfirmation("");
    const res = await fetch("/api/registration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ courseId }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || "Could not register for this course.");
    } else {
      setRegisteredIds((prev) => new Set(prev).add(courseId));
      const course = courses.find((c) => c.id === courseId);
      setConfirmation(
        `You are now registered for ${course?.code} — ${course?.title}.`
      );
    }
    setBusyId(null);
  }

  async function handleDrop(courseId) {
    setBusyId(courseId);
    setMessage("");
    const res = await fetch(`/api/registration?courseId=${courseId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setRegisteredIds((prev) => {
        const next = new Set(prev);
        next.delete(courseId);
        return next;
      });
    }
    setBusyId(null);
  }

  return (
    <div className="flex min-h-screen flex-col bg-paper md:flex-row">
      <Sidebar role="student" />
      <div className="flex-1 min-w-0">
        <Topbar
          title="Course Catalogue"
          subtitle="Register for courses offered this semester"
          user={user}
        />
        <main className="p-4 sm:p-8">
          {!loading && settings && !settings.registrationOpen && (
            <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              Course registration is currently closed for {settings.currentSession} — {settings.currentSemester}. You can browse courses, but registering and dropping are disabled until it reopens.
            </div>
          )}

          {confirmation && (
            <div className="mb-5 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {confirmation}
            </div>
          )}

          {message && (
            <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {message}
            </div>
          )}

          {loading ? (
            <p className="text-sm text-ink-soft">Loading courses…</p>
          ) : courses.length === 0 ? (
            <div className="rounded-lg border border-dashed border-line bg-white px-6 py-12 text-center text-sm text-ink-soft">
              No courses have been added yet. Check back once the admin
              publishes this semester&apos;s course list.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isRegistered={registeredIds.has(course.id)}
                  onRegister={handleRegister}
                  onDrop={handleDrop}
                  busy={busyId === course.id}
                  disabled={!settings?.registrationOpen}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}