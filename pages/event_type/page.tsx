// import UserSection from "./_components/user-section";
// import EventListSection from "./_components/event-list-section";
// // import PageTitle from "@/components/PageTitle";
// import { geteventListQueryFn } from "@/lib/api";
// import { useQuery } from "@tanstack/react-query";
// import { Loader } from "@/components/loader";
// import EmptyState from "./_components/empty-state";
// import { ErrorAlert } from "@/components/ErrorAlert";
// import React from 'react'
// import Mainsidebar from "@/components/ui/mainSideBar";
// import {
//   Modal,
//   ModalBody,
//   ModalContent,
//   ModalFooter,
//   ModalTrigger,
// } from "@/components/ui/animated-modal";
// import { motion } from "motion/react";
// import { SignInForm } from "@/components/sign-in-form";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


// const EventType = () => {
//   const { data, isPending, isError, error } = useQuery({
//     queryKey: ["event_list"],
//     queryFn: geteventListQueryFn,
//   });

//   const events = data?.data.events || [];
//   const username = data?.data.username ?? "";

//   return (
//     <div className="flex w-full dark:bg-[#0F0F0F]"> 
//     <Mainsidebar/>
//     <div className="flex w-full flex-col px-8 py-2 gap-8">
     
//       <ErrorAlert isError={isError} error={error} />

//       {isPending ? (
//         <div className="flex items-center justify-center min-h-[50vh]">
//           <Loader size="lg" color="black" />
//         </div>
//       ) : events?.length === 0 ? (
//         <div>
//           <EmptyState />
//         </div>
//       ) : (
//         <div className="w-full">
//           <UserSection username={username} />
//           <EventListSection events={events} username={username} />
//         </div>
//       )}
       
//       <Modal>
//         <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
//           <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
//             Login
//           </span>
//         </ModalTrigger>
//         <ModalBody>
//           <ModalContent>
//             <Tabs defaultValue="account" className="w-full">
//   <TabsList>
//     <TabsTrigger value="signin">Sign In</TabsTrigger>
//     <TabsTrigger value="signup">Password</TabsTrigger>
//   </TabsList>
//   <TabsContent value="signin"><SignInForm/></TabsContent>
//   <TabsContent value="signup" className=" w-full"> </TabsContent>
// </Tabs>
//           </ModalContent>
//           <ModalFooter className="gap-4">
//             <button className="px-2 py-1 bg-gray-200 text-black dark:bg-black dark:border-black dark:text-white border border-gray-300 rounded-md text-sm w-28">
//               Cancel
//             </button>
//             <button className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-black w-28">
//               Book Now
//             </button>
//           </ModalFooter>
//         </ModalBody>
//       </Modal>
 
//     </div>
//     </div>
//   );
// };

// export default EventType;

"use client";

import { useQuery} from "@tanstack/react-query";
import {
  geteventListQueryFn,
} from "@/lib/api";
import { Loader } from "@/components/loader";
import Mainsidebar from "@/components/ui/mainSideBar";
import EmptyState from "./_components/empty-state";
import { ErrorAlert } from "@/components/ErrorAlert";
import UserSection from "./_components/user-section";
import EventListSection from "./_components/event-list-section";
import { AuthRedirect } from "@/components/auth-redirect";


const EventType = ({ className, ...props }: React.ComponentPropsWithoutRef<"div">) => {
  const { data, isPending: isFetchingEvents, isError, error } = useQuery({
    queryKey: ["event_list"],
    queryFn: geteventListQueryFn,
  });

  const events = data?.data.events || [];
  const username = data?.data.username ?? "";

  return (
    <div className="flex w-full max-h-screen dark:bg-[#0F0F0F]">
      <Mainsidebar />
      <div className="flex w-full flex-col px-8 py-2 gap-8">
        <ErrorAlert isError={isError} error={error} />
        <AuthRedirect/>
        {isFetchingEvents ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <Loader size="lg" color="black" />
          </div>
        ) : events?.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="w-full">
            <UserSection username={username} />
            <EventListSection events={events} username={username} />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventType;
