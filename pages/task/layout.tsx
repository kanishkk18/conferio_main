"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React, { useEffect, useState } from "react";
import TaskPage from "./page";
import Mainsidebar from "@/components/ui/mainSideBar";

export default function DashboardLayout({
  // children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [currentDateTime, setCurrentDateTime] = useState<Date | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDateTime = currentDateTime
    ? `${currentDateTime.toLocaleString("en-US", {
        weekday: "long",
      })}, ${currentDateTime.toLocaleString("en-US", {
        month: "long",
      })} ${currentDateTime.getDate()}, ${currentDateTime.getFullYear()} - ${currentDateTime.toLocaleTimeString()}`
    : "";

  return (
    <div>
      <SidebarProvider>
        <Mainsidebar/>
        <AppSidebar />
        <SidebarInset className="">
          <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 " />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="">
                    {formattedDateTime || "Loading..."}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <TaskPage/>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
