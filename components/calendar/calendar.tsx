 
import Header from "@/components/calendar/header/Header";
import MainView from "@/components/calendar/MainView";
import MainSidebar from "@/components/ui/mainSideBar";
// import { CalendarEventType } from "lib/store";
// import { prisma } from "utils/db";
// import dayjs from "dayjs";

// export async function getServerSideProps() {
//   try {
//     const data = await prisma.event.findMany();

//     const dbEvents: CalendarEventType[] = data.map((event) => ({
//       ...event,
//       id: String(event.id),
//       date: dayjs(event.date),
//     }));

//     return {
//       props: {
//         dbEvents,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching events:", error);
//     return {
//       props: {
//         dbEvents: [],
//       },
//     };
//   }
// }

export default function Calendar(
  // { dbEvents }: { dbEvents: CalendarEventType[] }
) {
  return (
    <div className="flex h-full w-full">
      <MainSidebar />
      <div className="w-full">
        <Header />
        <MainView />
      </div>
    </div>
  );
}
