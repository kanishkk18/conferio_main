// import { FC, useState, useEffect } from "react";
// import { MeetingType } from "types/calendar";
// import { Loader, Calendar } from "lucide-react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";
// import { CalendarMeeting } from "./calender-meeting";
// import { useCalendarStore } from "store/calendar-store";

// // Mock cancel function - replace with your actual API call
// const cancelMeetingMutationFn = async (meetingId: string) => {
//   // Simulate API call
//   await new Promise(resolve => setTimeout(resolve, 1000));
//   return { message: "Meeting cancelled successfully" };
// };

// interface PropsType {
//   isFetching: boolean;
//   period: string;
//   meetings: MeetingType[];
// }

// const CalendarMeetingPanel: FC<PropsType> = ({ period, meetings, isFetching }) => {
//   const [pendingMeetingId, setPendingMeetingId] = useState<string | null>(null);
//   const { convertMeetingsToEvents } = useCalendarStore();

//   const queryClient = useQueryClient();
//   const { mutate, isPending } = useMutation({
//     mutationFn: cancelMeetingMutationFn,
//   });

//   // Convert meetings to calendar events when meetings change
//   useEffect(() => {
//     if (meetings && meetings.length > 0) {
//       convertMeetingsToEvents(meetings);
//     }
//   }, [meetings, convertMeetingsToEvents]);

//   const handleCancel = (meetingId: string) => {
//     setPendingMeetingId(meetingId);
//     mutate(meetingId, {
//       onSuccess: (response) => {
//         queryClient.invalidateQueries({
//           queryKey: ["userMeetings"],
//         });
//         setPendingMeetingId(null);
//         toast.success(`${response.message}`);
//       },
//       onError: () => {
//         setPendingMeetingId(null);
//         toast.error("Failed to cancel meeting");
//       },
//     });
//   };

//   return (
//     <div className="w-full">
//       {isFetching ? (
//         <div className="flex flex-col items-center justify-center">
//           <Loader className="h-8 w-8 animate-spin text-primary" />
//         </div>
//       ) : meetings?.length === 0 ? (
//         <div className="relative overflow-hidden">
//           <div className="absolute inset-0 bg-gradient-primary opacity-80 rounded-2xl"></div>
//           <div className="relative px-8 py-12 rounded-2xl border border-primary/30 shadow-soft backdrop-blur-sm">
//             <div className="text-center text-primary-foreground">
//               <div className="w-16 h-16 mx-auto mb-4 bg-primary-foreground/20 rounded-full flex items-center justify-center border border-primary-foreground/30">
//                 <Calendar className="h-8 w-8 text-primary-foreground" />
//               </div>
//               <h3 className="text-xl font-bold mb-2">All Clear!</h3>
//               <p className="text-primary-foreground/90 font-medium">No meetings scheduled for today</p>
//               <p className="text-primary-foreground/70 text-sm mt-1">Time to focus on your priorities</p>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="w-full">
//           <ul className="w-full h-full space-x-4 flex items-center">
//             {meetings?.slice(0, 1).map((meeting) => (
//               <li key={meeting.id} className="w-full h-full">
//                 <CalendarMeeting
//                   period={period}
//                   isPending={pendingMeetingId == meeting.id ? isPending : false}
//                   meeting={meeting}
//                   onCancel={() => handleCancel(meeting.id)}
//                 />
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CalendarMeetingPanel;


import { FC, useState } from "react";
// import EmptyPanel from "./empty-panel";
import { MeetingType, PeriodType } from "types/api.type";
import { Loader } from "@/components/loader";
// import { PeriodEnum } from "hooks/use-meeting-filter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelMeetingMutationFn } from "@/lib/api";
import { toast } from "sonner";
import UpcomingMeeting from "./upcoming-meeting";

interface PropsType {
  isFetching: boolean;
  period: PeriodType;
  meetings: MeetingType[];
}


const CalendarMeetingPanel: FC<PropsType> = ({ period, meetings, isFetching }) => {
  const [pendingMeetingId, setPendingMeetingId] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: cancelMeetingMutationFn,
  });

  const handleCancel = (meetingId: string) => {
    setPendingMeetingId(meetingId);
    mutate(meetingId, {
      onSuccess: (response) => {
        queryClient.invalidateQueries({
          queryKey: ["userMeetings"],
        });
        setPendingMeetingId(null);
        toast.success(`${response.message}`);
      },
      onError: () => {
        setPendingMeetingId(null);
        toast.success("Failed to cancel meeting");
      },
    });
  };

  return (
    <div className="w-full">
      {isFetching ? (
        <div className="flex flex-col items-center justify-center">
          <Loader size="lg" color="black" />
        </div>
      ) : meetings?.length === 0 ? (
        // <EmptyPanel
        //   title={`No ${
        //     period === PeriodEnum.UPCOMING
        //       ? "Upcoming"
        //       : period === PeriodEnum.PAST
        //       ? "Past"
        //       : "Cancelled"
        //   } Meeting`}
        // />
        <div className="px-4 py-14 h-full gap-4 flex bg-blue-500 rounded-xl flex-col">
          No bookings
        </div>
      ) : (
        <div className=" w-full">
          <ul className="w-full h-full space-x-4 flex items-center ">
            {meetings.map((meeting) => (
              <li key={meeting.id} className="w-full h-full">
                
                <UpcomingMeeting
                period={period}
                  isPending={pendingMeetingId == meeting.id ? isPending : false}
                  meeting={meeting}
                  onCancel={() => handleCancel(meeting.id)}/>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CalendarMeetingPanel;
