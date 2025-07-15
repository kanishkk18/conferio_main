// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { ENV } from "@/lib/get-env";
// import NewEventDialog from "./new-event-dialog";
// import { useStore } from "store/store";

// const UserSection = (props: { username: string }) => {
//   const { user } = useStore();
//   const username = props.username || user?.username;
//   const my_link = `${ENV.VITE_APP_ORIGIN}/${username}`;
//   return (
//     <div
//       className="w-full flex flex-wrap items-center justify-between 
//     mb-5 border-b border-[#D4E162] "
//     >
//       <div className="flex items-center p-[16px_0_8px] gap-3">
//         <div className="w-[54px] h-[54px] flex items-center justify-center">
//           <Avatar className="!w-[45px] !h-[45px] !p-px border-2 border-[#CCCCCC] transition-colors">
//             <AvatarFallback className="bg-[#e7edf6] uppercase">
//               {user?.name?.charAt(0)}
//             </AvatarFallback>
//           </Avatar>
//         </div>
//         <div className="flex flex-col">
//           <div className="flex">
//             <span
//               className="block max-w-[340px] capitalize whitespace-nowrap 
//             overflow-hidden truncate line-clamp-1 text-sm font-normal"
//             >
//               {user?.name}
//             </span>
//           </div>
//           <div className="flex">
//             <a target="_blank" href={my_link} className="text-[#004eba]">
//               <span
//                 className="block max-w-[340px] whitespace-nowrap 
//             overflow-hidden truncate line-clamp-1 text-sm font-normal"
//               >
//                 {my_link}
//               </span>
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* {Create Event } */}
//       <div className="flex items-center p-[18px_0]">
//         <NewEventDialog />
//       </div>
//     </div>
//   );
// };

// export default UserSection;

"use client";

// import { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ENV } from "@/lib/get-env";
import NewEventDialog from "./new-event-dialog";
import { useStore } from "store/store";
// import { Button } from "@/components/ui/button";
import Link from "next/link";
// import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search } from "lucide-react";
import Header from "@/components/Header";

const UserSection = (props: { username: string }) => {
  const { user } = useStore();
  const username = props.username || user?.username;
  const my_link = `${ENV.NEXT_PUBLIC_APP_ORIGIN}/${username}`;
  // const [open, setOpen] = useState(false);

  return (
    <div className="w-full flex flex-wrap items-center justify-between mb-5">

       <div className="flex items-center justify-between w-full p-[16px_0_8px] gap-3">
        <div className="flex flex-col">
          <div className="flex">
            <span className="block max-w-[340px] capitalize whitespace-nowrap overflow-hidden truncate line-clamp-1 text-xl font-semibold">
              Event Types
            </span>
          </div>
          <div className="font-normal text-sm pt-1">
            Create events to share for people to book on your calendar.
          </div>
        </div>

         <div className="flex items-center  gap-3">
        
        <div className="flex justify-end items-end flex-col">
          <div className="flex">
            <span className="block text-end max-w-[340px] capitalize whitespace-nowrap overflow-hidden truncate line-clamp-1 text-sm font-normal">
              {user?.name}
            </span>
          </div>
          <div className="flex">
            <div className="flex">
             <Link href={my_link} className="text-[#004eba]">
               <span
                 className="block max-w-[340px] whitespace-nowrap 
             overflow-hidden truncate line-clamp-1 text-sm font-normal"
               >
                 {my_link}
               </span>
             </Link>
           </div>
          </div>
        </div>
        <div className="w-[54px] h-[54px] flex items-center justify-center">
          {/* <Avatar className="!w-[45px] !h-[45px] !p-px border-2 border-[#CCCCCC] transition-colors">
            <AvatarFallback className=" uppercase">
              {user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar> */}
          <Header/>
        </div>
      </div>
      </div>
      
      {/* Create Event */}
      <div className="flex items-center justify-between w-full py-4 ">
         <div className="relative">
                <Input className="peer pe-20 ps-9" placeholder="Search..." type="search" />
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                  <Search size={16} strokeWidth={2} />
                </div>
                <button
                  className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Submit search"
                  type="submit"
                >
                  <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                </button>
              </div>
        {/* <ThemeToggle/> */}
        <NewEventDialog />
      </div>
    </div>
  );
};

export default UserSection;
