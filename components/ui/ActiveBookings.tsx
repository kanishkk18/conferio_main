import React from 'react';
import { ArrowUpRightIcon, Edit2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
import { MeetingType, PeriodType } from "types/api.type";
import { format, parseISO } from "date-fns";
import { PeriodEnum } from "hooks/use-meeting-filter";
  import Link from "next/link";
import { AnimatedTooltip } from './animated-tooltip';
import { Switch } from './switch';

const ActiveBookings = (props: {
  meeting: MeetingType;
  period: PeriodType;
  isPending: boolean;
  onCancel: () => void;
}) => {
   const { meeting, period, onCancel } = props;  
    // Format the date and time
    const startTime = parseISO(meeting.startTime);
    const endTime = parseISO(meeting.endTime);
    const formattedTime = `${format(startTime, "h:mm a")} – ${format(
      endTime,
      "h:mm a"
    )}`;

    const people = [
  {
    id: Number(meeting.id),
    name: meeting.guestName,
    designation: meeting.guestEmail,
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
  },
];
  

  return (
    <div className="min-w-full gap-2 h-full w-full">
      
      <div className=" flex min-w-full space-x-2 w-full h-full justify-center">
       
          <div className="p-4 w-full bg-zinc-900 rounded-xl">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-white font-semibold text-md mb-2">{meeting.event.title}</h4>
                <p className="text-gray-400 text-xs">{formattedTime}</p>
              </div>
              <span className="text-xs text-dashboard-green">
                {period === PeriodEnum.UPCOMING && (
                   <Switch  onClick={onCancel}/>   
                )} </span>
            </div>
            
            <div className="mt-3 flex justify-between">
              <div className="gap-2 flex flex-col justify-start items-start">
              <div className="text-xs text-yellow-500 bg-black/20 p-2 px-3 rounded-xl">Team</div>
                 <div className="flex flex-row items-start justify-start w-full">
                       <AnimatedTooltip items={people} />
                     </div>
                     </div>
              
              
              <div className="flex justify-center items-end gap-2">
                <div className=" p-2 bg-white rounded-full">
                  <Edit2 className='h-4 text-black w-4'/>
                </div>

                 <Link href={meeting.meetLink} className=" p-2 bg-blue-500 rounded-full">
                  <ArrowUpRightIcon className='h-4 font-bold text-white w-4'/>
                </Link>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default ActiveBookings;
