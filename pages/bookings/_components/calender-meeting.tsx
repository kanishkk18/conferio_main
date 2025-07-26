// import React from 'react';
// import { ArrowUpRight, Calendar, Clock, User, MapPin } from "lucide-react";
// import { MeetingType } from "types/calendar";
// import { format, parseISO } from "date-fns";
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { useCalendarStore } from '../../../store/calendar-store';

// export const CalendarMeeting = (props: {
//   meeting: MeetingType;
//   period: string;
//   isPending: boolean;
//   onCancel: () => void;
// }) => {
//   const { meeting } = props;
//   const { openEventSheet, events } = useCalendarStore();
  
//   // Format the date and time
//   const startTime = parseISO(meeting.startTime);
//   const endTime = parseISO(meeting.endTime);
//   const formattedDate = format(startTime, "EE, d MMMM yyyy");
//   const formattedTime = `${format(startTime, "h:mm a")} – ${format(endTime, "h:mm a")}`;

//   // Find the corresponding calendar event
//   const calendarEvent = events.find(event => event.id === meeting.id);

//   const handleMeetingClick = () => {
//     if (calendarEvent) {
//       openEventSheet(calendarEvent);
//     }
//   };

//   return (
//     <div className="relative group w-full" onClick={handleMeetingClick}>
//       <div className="relative overflow-hidden cursor-pointer">
//         <div className="absolute inset-0 bg-gradient-primary opacity-90 rounded-2xl"></div>
//         <div className="absolute inset-0 bg-gradient-subtle opacity-20 rounded-2xl"></div>
        
//         <div className="relative px-8 py-6 rounded-2xl border border-primary/30 shadow-elegant hover:shadow-soft transition-all duration-300 backdrop-blur-sm">
//           <div className="flex items-start justify-between">
//             <div className="flex-1 space-y-4">
//               <div className="flex items-start gap-4">
//                 <div className="p-3 bg-primary-foreground/15 rounded-xl backdrop-blur-sm border border-primary-foreground/20">
//                   <Calendar className="h-6 w-6 text-primary-foreground" />
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center gap-3 mb-2">
//                     <h3 className="text-xl font-bold text-primary-foreground line-clamp-1">
//                       {meeting.event.title}
//                     </h3>
//                     <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30 font-medium">
//                       Upcoming
//                     </Badge>
//                   </div>
//                   <p className="text-primary-foreground/90 text-sm font-semibold mb-1">
//                     {formattedDate}
//                   </p>
//                   <div className="flex items-center gap-1 text-primary-foreground/80 text-xs">
//                     <div className="w-2 h-2 rounded-full bg-primary-foreground/60"></div>
//                     <span>Next meeting on your schedule</span>
//                   </div>
//                 </div>
//               </div>
              
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div className="flex items-center gap-3 text-primary-foreground/90 text-sm bg-primary-foreground/10 rounded-lg p-3 border border-primary-foreground/20">
//                   <Clock className="h-4 w-4 text-primary-foreground/80" />
//                   <span className="font-semibold">{formattedTime}</span>
//                 </div>
//                 {meeting.guestName && (
//                   <div className="flex items-center gap-3 text-primary-foreground/90 text-sm bg-primary-foreground/10 rounded-lg p-3 border border-primary-foreground/20">
//                     <User className="h-4 w-4 text-primary-foreground/80" />
//                     <span className="font-semibold truncate">{meeting.guestName}</span>
//                   </div>
//                 )}
//               </div>

//               {meeting.event.description && (
//                 <div className="bg-primary-foreground/10 rounded-lg p-4 border border-primary-foreground/20">
//                   <p className="text-primary-foreground/90 text-sm line-clamp-2 leading-relaxed">
//                     {meeting.event.description}
//                   </p>
//                 </div>
//               )}

//               {meeting.guestEmail && (
//                 <div className="flex items-center gap-2 text-primary-foreground/80 text-xs">
//                   <MapPin className="h-3 w-3" />
//                   <span className="font-mono">{meeting.guestEmail}</span>
//                 </div>
//               )}
//             </div>
            
//             <Button
//               variant="ghost"
//               size="icon"
//               className="h-10 w-10 text-primary-foreground hover:bg-primary-foreground/20 rounded-full transition-all duration-200 ml-4"
//             >
//               <ArrowUpRight className="h-5 w-5" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


import React from 'react';
// import { Button } from "@/components/ui/button";
import { MeetingType, PeriodType } from "types/api.type";


const CalendarMeeting = (props: {
  meeting: MeetingType;
  period: PeriodType;
  isPending: boolean;
  onCancel: () => void;
}) => {
   const { meeting } = props;
  
  return (
          <div className=" h-full ">
                  <div className="px-3 py-1 gap-4 flex bg-blue-500 rounded-xl h-full flex-col">
                        <div className="flex flex-col justify-start items-start">
                          <h1 className="text-sm text-white font-semibold [text-shadow:_1px_1px_4px_rgba(0,0,0,0.6)]">{meeting.event.title}</h1>
                        </div>
                      </div>
                </div>
      
  );
};

export default CalendarMeeting;


// import React from 'react';
// import { ArrowUpRight} from "lucide-react";
// // import { Button } from "@/components/ui/button";
// import { MeetingType, PeriodType } from "types/api.type";
// import { format, parseISO } from "date-fns";
//   import Link from "next/link";
// import { AnimatedTooltip } from '@/components/ui//animated-tooltip';
// import { Separator } from '@/components/ui/separator';


// const CalendarMeeting = (props: {
//   meeting: MeetingType;
//   period: PeriodType;
//   isPending: boolean;
//   onCancel: () => void;
// }) => {
//    const { meeting } = props;
  
//     // Format the date and time
//     const startTime = parseISO(meeting.startTime);
//     const endTime = parseISO(meeting.endTime);
//     // const formattedDate = format(startTime, "EE, d MMMM yyyy"); // e.g., "Wednesday, 19 March 2025"
//     // const formattedTime = `${format(startTime, "h:mm a")} – ${format(
//     //   endTime,
//     //   "h:mm a"
//     // )}`;

  
//     const people = [
//   {
//     id: Number (meeting.id),
//     name: meeting.guestName,
//     designation: meeting.guestEmail,
//     image:
//       "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
//   },
// ];
  
//   return (
//           <div className=" h-full">
//                   <div className="px-4 py-2 gap-4 flex shadow-md rounded-xl h-full flex-col">
//                         <div className="flex flex-col justify-start items-start">
//                           <h1 className="text-md font-semibold">{meeting.event.title}</h1>
//                           <p className="text-sm font-semibold ">
//                             {(() => {
//                             const now = new Date();
//                             const diffMs = parseISO(meeting.startTime).getTime() - now.getTime();

//                             if (diffMs > 0) {
//                               const diffSec = Math.ceil(diffMs / 1000);
//                               const diffMin = Math.ceil(diffSec / 60);
//                               const diffHour = Math.ceil(diffMin / 60);
//                               const diffDay = Math.ceil(diffHour / 24);

//                               if (diffDay > 1) {
//                                 return `${diffDay} Days left`;
//                               } else if (diffHour > 1) {
//                                 return `${diffHour} Hours left`;
//                               } else if (diffMin > 1) {
//                                 return `${diffMin} Min left`;
//                               } else {
//                                 return `${diffSec} Sec left`;
//                               }
//                             } else if (diffMs > -60000) {
//                               return "Now";
//                             } else {
//                               return "Started";
//                             }
//                           })()}</p>
//                         </div>
//                        <Separator/>
//                         <div className="flex text-center justify-between w-full items-center">
//  <div className="flex flex-row items-start justify-start w-full">
//       <AnimatedTooltip items={people} />
//     </div>
//     <Link href={meeting.meetLink} className="text-sm text-white bg-black/70 rounded-full p-1"><ArrowUpRight className="h-5 w-5"/> </Link>

//                         </div>
//                       </div>
//                 </div>
      
//   );
// };

// export default CalendarMeeting;

