// import React from 'react';
// import { cn } from '@/lib/utils';


// const Calendar: React.FC = () => {



//   // Time slots for the scheduler
//   const timeSlots = Array.from({ length: 12 }, (_, i) => {
//     const hour = i + 8; // Start from 8 AM
//     return `${hour.toString().padStart(2, '0')}:00`;
//   });

//   return (
//     <div className="pt-20">
    
     
    
//       <div className="flex flex-col space-y-4 mt-6">
//         {timeSlots.map((time, index) => (
//           <div key={time} className="flex">
//             <div className="w-12 text-xs text-gray-500">{time}</div>
//             <div className="flex-grow relative">
//               {/* Render events at specific times */}
//               {index === 2 && (
//                 <div className={`absolute left-2 right-4 purple-card p-2 rounded-lg`}>
//                   <div className="flex items-center">
//                     <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
//                     <p className="text-xs font-medium">Design Meeting</p>
//                   </div>
//                   <p className="text-xs opacity-80 mt-0.5">10:30 AM - 11:30 AM</p>
//                 </div>
//               )}
//               {index === 5 && (
//                 <div className={`absolute left-2 right-4 green-card p-2 rounded-lg`}>
//                   <div className="flex items-center">
//                     <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
//                     <p className="text-xs font-medium">Planning Work</p>
//                   </div>
//                   <p className="text-xs opacity-80 mt-0.5">1:30 PM - 3:15 PM</p>
//                 </div>
//               )}
//               {index === 9 && (
//                 <div className={`absolute left-2 right-4 yellow-card p-2 rounded-lg`}>
//                   <div className="flex items-center">
//                     <div className="w-2 h-2 rounded-full bg-black mr-2"></div>
//                     <p className="text-xs font-medium text-black">Daily Stand-Up</p>
//                   </div>
//                   <p className="text-xs text-black opacity-80 mt-0.5">5:30 PM - 6:00 PM</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Calendar;

import * as React from "react"
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react"
import { DayButton, DayPicker, getDefaultClassNames } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "./button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"


function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = "label",
  buttonVariant = "ghost",
  formatters,
  components,
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"]
}) {
  const defaultClassNames = getDefaultClassNames()

   const timeSlots = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 8; // Start from 8 AM
    return `${hour.toString().padStart(2, '0')}:00`;
  });


  return (
     <div className="pt-14 h-full w-fit overflow-hidden mx-auto  ">
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        "group/calendar p-1 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent",
        String.raw`rtl:**:[.rdp-button\_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button\_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-full", defaultClassNames.root),
        months: cn(
          "relative flex flex-col gap-2 md:flex-row",
          defaultClassNames.months
        ),
        month: cn("flex w-full flex-col gap-2", defaultClassNames.month),
        nav: cn(
          "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
          defaultClassNames.nav
        ),
        button_previous: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant }),
          "h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50",
          defaultClassNames.button_next
        ),
        month_caption: cn(
          "flex h-[--cell-size] w-full items-center justify-center px-[--cell-size]",
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          "flex h-[--cell-size] w-full items-center justify-center gap-1.5 text-sm font-medium",
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          "has-focus:border-ring border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] relative rounded-md border",
          defaultClassNames.dropdown_root
        ),
        dropdown: cn("absolute inset-0 opacity-0", defaultClassNames.dropdown),
        caption_label: cn(
          "select-none font-medium",
          captionLayout === "label"
            ? "text-sm"
            : "[&>svg]:text-muted-foreground flex h-4 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5",
          defaultClassNames.caption_label
        ),
        table: "w-full border-collapse",
        weekdays: cn("flex", defaultClassNames.weekdays),
        weekday: cn(
          "text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal",
          defaultClassNames.weekday
        ),
        week: cn(" flex w-full", defaultClassNames.week),
        week_number_header: cn(
          "w-[--cell-size] select-none",
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          "text-muted-foreground select-none text-[0.4rem]",
          defaultClassNames.week_number
        ),
        day: cn(
          "group/day relative aspect-square m-1 h-[60px] bg-[#F4F4F5] dark:bg-[#101012] w-[60px] select-none p-2 rounded-lg text-[12px] text-start [&:first-child[data-selected=true]_button]:rounded-l-md [&:last-child[data-selected=true]_button]:rounded-md",
          defaultClassNames.day
        ),
        range_start: cn(
          "bg-accent rounded-l-md",
          defaultClassNames.range_start
        ),
        range_middle: cn("rounded-none", defaultClassNames.range_middle),
        range_end: cn("bg-accent rounded-r-md", defaultClassNames.range_end),
        today: cn(
          "border-red-500 border text-accent-foreground rounded-md data-[selected=true]:rounded-none",
          defaultClassNames.today
        ),
        outside: cn(
          "text-muted-foreground aria-selected:text-muted-foreground",
          defaultClassNames.outside
        ),
        disabled: cn(
          "text-muted-foreground opacity-50",
          defaultClassNames.disabled
        ),
        hidden: cn("invisible", defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === "left") {
            return (
              <ChevronLeftIcon className={cn("size-4", className)} {...props} />
            )
          }

          if (orientation === "right") {
            return (
              <ChevronRightIcon
                className={cn("size-4", className)}
                {...props}
              />
            )
          }

          return (
            <ChevronDownIcon className={cn("size-4", className)} {...props} />
          )
        },
        DayButton: CalendarDayButton,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-[--cell-size] items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />

<Drawer>
  <DrawerTrigger className="h-56 mt-2 overflow-hidden md:w-[450px] lg:min-w-[495px]">
    <div className="flex flex-col space-y-2">
      <div className=" h-2 mt-2 z-50 w-[100px] rounded-full bg-muted mx-auto" />
        {timeSlots.map((time, index) => (
          <div key={time} className="flex">
            <div className="w-12 text-xs text-gray-500">{time}</div>
            <div className="flex-grow relative">
              {/* Render events at specific times */}
              {index === 2 && (
                <div className={`absolute left-2 right-4 purple-card p-2 rounded-lg`}>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                    <p className="text-xs font-medium">Design Meeting</p>
                  </div>
                  <p className="text-xs opacity-80 mt-0.5">10:30 AM - 11:30 AM</p>
                </div>
              )}
              {index === 5 && (
                <div className={`absolute left-2 right-4 green-card p-2 rounded-lg`}>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                    <p className="text-xs font-medium">Planning Work</p>
                  </div>
                  <p className="text-xs opacity-80 mt-0.5">1:30 PM - 3:15 PM</p>
                </div>
              )}
              {index === 9 && (
                <div className={`absolute left-2 right-4 yellow-card p-2 rounded-lg`}>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-black mr-2"></div>
                    <p className="text-xs font-medium text-black">Daily Stand-Up</p>
                  </div>
                  <p className="text-xs text-black opacity-80 mt-0.5">5:30 PM - 6:00 PM</p>
                </div>
              )}
            </div>
          </div>
        ))}
  </div></DrawerTrigger>
  <DrawerContent className=" absolute bottom-0 right-[0%] z-50 h-auto bg-white dark:bg-black/80 w-[495px] rounded-t-[10px] p-2 border">
     <div className="flex flex-col space-y-4 mt-3">
        {timeSlots.map((time, index) => (
          <div key={time} className="flex">
            <div className="w-12 text-xs text-gray-500">{time}</div>
            <div className="flex-grow relative">
              {/* Render events at specific times */}
              {index === 2 && (
                <div className={`absolute left-2 right-4 purple-card p-2 rounded-lg`}>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                    <p className="text-xs font-medium">Design Meeting</p>
                  </div>
                  <p className="text-xs opacity-80 mt-0.5">10:30 AM - 11:30 AM</p>
                </div>
              )}
              {index === 5 && (
                <div className={`absolute left-2 right-4 green-card p-2 rounded-lg`}>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                    <p className="text-xs font-medium">Planning Work</p>
                  </div>
                  <p className="text-xs opacity-80 mt-0.5">1:30 PM - 3:15 PM</p>
                </div>
              )}
              {index === 9 && (
                <div className={`absolute left-2 right-4 yellow-card p-2 rounded-lg`}>
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full bg-black mr-2"></div>
                    <p className="text-xs font-medium text-black">Daily Stand-Up</p>
                  </div>
                  <p className="text-xs text-black opacity-80 mt-0.5">5:30 PM - 6:00 PM</p>
                </div>
              )}
            </div>
          </div>
        ))}
   </div>
  </DrawerContent>
</Drawer>
  
    </div>
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      className={cn(
        "data-[selected-single=true]:bg-primary data-[selected-single=true]:text-primary-foreground data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground data-[range-start=true]:bg-primary data-[range-start=true]:text-primary-foreground data-[range-end=true]:bg-primary data-[range-end=true]:text-primary-foreground group-data-[focused=true]/day:border-ring group-data-[focused=true]/day:ring-ring/50 flex aspect-square h-auto w-full min-w-[--cell-size] flex-col gap-1 font-normal leading-none data-[range-end=true]:rounded-md data-[range-middle=true]:rounded-none data-[range-start=true]:rounded-md group-data-[focused=true]/day:relative group-data-[focused=true]/day:z-10 group-data-[focused=true]/day:ring-[3px] [&>span]:text-xs [&>span]:opacity-70",
        defaultClassNames.day,
        className
      )}
      {...props}
    >
      {day.date.getDate()}
    </Button>
  )
}

export { Calendar, CalendarDayButton }
