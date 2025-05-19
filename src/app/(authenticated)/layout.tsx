
"use client"
import type React from "react";
import { ProtectedRoute } from "@/lib/ProtectedRoute";
import { DashboardHeader } from "@/components/Dashboard-header";
import { DashboardSidebar } from "@/components/Dashboard-sidebar";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { useEffect } from "react";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { isLoggedIn, keepLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/login");
      return;
    }

    if (keepLoggedIn) return;

    const events = ["mousemove", "keydown", "click", "scroll"];
    let timeoutId: NodeJS.Timeout | undefined;

    const resetTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        router.replace("/login");
      }, 60000); // 60 seconds
    };

    const handleUserActivity = () => {
      resetTimeout();
    };

    events.forEach((event) => {
      window.addEventListener(event, handleUserActivity);
    });
    resetTimeout();

    return () => {
      clearTimeout(timeoutId);
      events.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, [router, isLoggedIn, keepLoggedIn]);

  return (
    <ProtectedRoute>
    <div>
      <DashboardHeader />

      <div className="h-screen flex gap-5">
        {/** sidebar */}
        <DashboardSidebar />
        <div className="flex-1 pr-5">
          {children}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
