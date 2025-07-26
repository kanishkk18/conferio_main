/* eslint-disable @typescript-eslint/no-unused-vars */
import { useDateFormatter } from "@react-aria/i18n";
import type { CalendarState } from "@react-stately/calendar";
import type { AriaButtonProps } from "@react-aria/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import type { DOMAttributes, FocusableElement } from "@react-types/shared";

import { CalendarButton } from "./calendar-button";

const CalendarHeader = ({
  state,
  calendarProps,
  prevButtonProps,
  nextButtonProps,
}: {
  state: CalendarState;
  calendarProps: DOMAttributes<FocusableElement>;
  prevButtonProps: AriaButtonProps<"button">;
  nextButtonProps: AriaButtonProps<"button">;
}) => {
  const monthDateFormatter = useDateFormatter({
    month: "long",
    year: "numeric",
    timeZone: state.timeZone,
  });

  const [monthName, _, year] = monthDateFormatter
    .formatToParts(state.visibleRange.start.toDate(state.timeZone))
    .map((part) => part.value);

  return (
    <div className="flex items-center gap-10 justify-between pb-0 m-[0px_6px_15px]">
      <VisuallyHidden>
        <h2>{calendarProps["aria-label"]}</h2>
      </VisuallyHidden>

      {/* Left Button */}
      <CalendarButton
        {...prevButtonProps}
        className="relative z-10 inline-flex justify-center items-center 
        w-[38px] h-[38px] rounded-full bg-[rgba(0,105,255,0.065)] text-[#0060d4]/80 
        disabled:!bg-transparent disabled:!text-muted-foreground
        "
      >
        <ChevronLeftIcon className="!w-5 !h-5" />
      </CalendarButton>

      {/* Centered Month and Year */}
      <h2 aria-hidden className="text-center font-semibold text-base">
        {monthName}{" "}
        <span className="text-muted-foreground font-medium">{year}</span>
      </h2>

      {/* Right Button */}
      <CalendarButton
        {...nextButtonProps}
        className="relative z-10 inline-flex justify-center items-center 
        w-[38px] h-[38px] rounded-full bg-[rgba(0,105,255,0.065)] text-[#0060d4]/80 "
      >
        <ChevronRightIcon className="!w-5 !h-5" />
      </CalendarButton>
    </div>
  );
};

export default CalendarHeader;


// import { ChevronLeft, ChevronRight, Calendar, Plus, MoreHorizontal } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { useCalendarStore } from 'store/calendar-store';
// import { format, addMonths, subMonths, addWeeks, subWeeks, addDays, subDays } from 'date-fns';

// export const CalendarHeader = () => {
//   const { currentDate, view, setCurrentDate, setView, openEventSheet } = useCalendarStore();

//   const navigatePrevious = () => {
//     switch (view) {
//       case 'month':
//         setCurrentDate(subMonths(currentDate, 1));
//         break;
//       case 'week':
//         setCurrentDate(subWeeks(currentDate, 1));
//         break;
//       case 'day':
//         setCurrentDate(subDays(currentDate, 1));
//         break;
//     }
//   };

//   const navigateNext = () => {
//     switch (view) {
//       case 'month':
//         setCurrentDate(addMonths(currentDate, 1));
//         break;
//       case 'week':
//         setCurrentDate(addWeeks(currentDate, 1));
//         break;
//       case 'day':
//         setCurrentDate(addDays(currentDate, 1));
//         break;
//     }
//   };

//   const getDateDisplay = () => {
//     switch (view) {
//       case 'month':
//         return format(currentDate, 'MMMM yyyy');
//       case 'week':
//         return format(currentDate, 'MMM yyyy');
//       case 'day':
//         return format(currentDate, 'MMMM d, yyyy');
//       default:
//         return format(currentDate, 'MMMM yyyy');
//     }
//   };

//   return (
//     <div className="sticky top-0 z-50 flex items-center justify-between px-8 py-6 border-b border-border/60 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
//       <div className="flex items-center gap-8">
//         <div className="flex items-center gap-3">
//           <div className="p-2 rounded-xl bg-gradient-primary shadow-elegant">
//             <Calendar className="h-6 w-6 text-primary-foreground" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold text-foreground tracking-tight">Calendar</h1>
//             <p className="text-sm text-muted-foreground">Manage your schedule</p>
//           </div>
//         </div>
        
//         <div className="flex items-center gap-3">
//           <div className="flex items-center rounded-full border border-border/60 bg-muted/30 p-1">
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={navigatePrevious}
//               className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-200"
//             >
//               <ChevronLeft className="h-4 w-4" />
//             </Button>
//             <Button
//               variant="ghost"
//               size="icon"
//               onClick={navigateNext}
//               className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary transition-all duration-200"
//             >
//               <ChevronRight className="h-4 w-4" />
//             </Button>
//           </div>
//           <div className="min-w-[220px] text-center">
//             <h2 className="text-xl font-semibold text-foreground tracking-tight">
//               {getDateDisplay()}
//             </h2>
//             <p className="text-sm text-muted-foreground capitalize">{view} view</p>
//           </div>
//         </div>
//       </div>

//       <div className="flex items-center gap-4">
//         <div className="flex items-center rounded-full border border-border/60 bg-muted/30 p-1 shadow-sm">
//           {(['month', 'week', 'day'] as const).map((viewType) => (
//             <Button
//               key={viewType}
//               variant={view === viewType ? 'default' : 'ghost'}
//               size="sm"
//               onClick={() => setView(viewType)}
//               className={`
//                 capitalize rounded-full px-4 font-medium transition-all duration-200
//                 ${view === viewType 
//                   ? 'bg-primary text-primary-foreground shadow-soft' 
//                   : 'hover:bg-primary/10 hover:text-primary'
//                 }
//               `}
//             >
//               {viewType}
//             </Button>
//           ))}
//         </div>
        
//         <Button 
//           onClick={() => openEventSheet()}
//           className="bg-gradient-primary hover:bg-primary/90 text-primary-foreground shadow-elegant hover:shadow-soft transition-all duration-200 font-medium px-6"
//         >
//           <Plus className="h-4 w-4 mr-2" />
//           Create Event
//         </Button>
        
//         <Button
//           variant="ghost"
//           size="icon"
//           className="h-9 w-9 rounded-full hover:bg-muted/60 transition-all duration-200"
//         >
//           <MoreHorizontal className="h-4 w-4" />
//         </Button>
//       </div>
//     </div>
//   );
// };