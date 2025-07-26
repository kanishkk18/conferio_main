import Calendar from "@/components/calendar/calendar";
import React from "react";

const CalendarPage: React.FC = () => {
  return (
    <main>
      {/* <Calendar /> */}
      <Calendar />
    </main>
  );
};

export default CalendarPage;

// import { useQuery } from '@tanstack/react-query';
// import { CalendarLayout } from '@/components/calendar/calendar-layout';
// import CalendarMeetingPanel from '../bookings/_components/calendar-meeting-panel';
// import useMeetingFilter from 'hooks/use-meeting-filter';
// import { getUserMeetingsQueryFn } from '@/lib/api';

// const Index = () => {
//   const { period } = useMeetingFilter();

//   const { data, isFetching } = useQuery({
//     queryKey: ['userMeetings', period],
//     queryFn: () => getUserMeetingsQueryFn(period),
//   });

//   const meetings = data?.meetings || [];

//   return (
//     <div className="h-screen flex flex-col bg-gradient-subtle">
//       {/* Meeting panel at the top */}
//       {/* <div className="px-8 py-6 border-b border-border/60 bg-background/95 backdrop-blur-md">
//         <div className="flex items-center gap-3 mb-4">
//           <div className="w-1 h-6 bg-gradient-primary rounded-full"></div>
//           <h2 className="text-xl font-bold text-foreground tracking-tight">Today's Schedule</h2>
//         </div>
//         <CalendarMeetingPanel
//           isFetching={isFetching}
//           meetings={meetings}
//           period={period}
//         />
//       </div> */}

//       {/* Calendar layout */}
//       <div className="flex-1">
//         <CalendarLayout />
//       </div>
//     </div>
//   );
// };

// export default Index;
