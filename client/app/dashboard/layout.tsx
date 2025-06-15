"use client";

import { AuthHoc } from "@/components/hoc/AuthHoc";

interface LayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  return <AuthHoc>{children}</AuthHoc>;
}
