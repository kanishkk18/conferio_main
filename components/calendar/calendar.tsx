 
import Header from "@/components/calendar/header/Header";
// import MainView from "@/components/calendar/MainView";
import MainSidebar from "@/components/ui/mainSideBar";
// import { prisma } from "utils/db";
// import dayjs from "dayjs";
import { CalendarLayout } from "./calendar-layout";


export default function Calendar(
) {
  return (
    <div className="flex h-full w-full">
      <MainSidebar />
      <div className="w-full">
        <Header />
         <CalendarLayout />
      </div>
    </div>
  );
}
