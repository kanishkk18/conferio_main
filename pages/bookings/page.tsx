import { useQuery } from "@tanstack/react-query";
// import { Card, CardContent } from "@/components/ui/card";
import TabHeader from "./_components/tab-header";
// import { Separator } from "@/components/ui/separator";
import TabPanel from "./_components/tab-panel";
import useMeetingFilter from "hooks/use-meeting-filter";
import { getUserMeetingsQueryFn } from "@/lib/api";
import { ErrorAlert } from "@/components/ErrorAlert";
// import { Loader } from "@/components/loader";
import { ArrowRight, Search } from 'lucide-react';
import Mainsidebar from "@/components/ui/mainSideBar"
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
  import { Input } from '@/components/ui/input';

const Meetings = () => {
  const { period } = useMeetingFilter();

  const { data, isFetching, isError, error } = useQuery({
    queryKey: ["userMeetings", period],
    queryFn: () => getUserMeetingsQueryFn(period),
  });

  const meetings = data?.meetings || [];

  return (
    <div className="flex flex-col !gap-3">
    
       <div className="flex w-full h-full dark:bg-black">
     <Mainsidebar/>
    <div className='flex flex-col w-full h-full p-6 overflow-auto'>
    
<Tabs defaultValue="modern" className=" h-full w-full ">
  <div className=" py-3  flex justify-between w-full ">
    <div className="flex flex-col">
        <div className='text-2xl font-semibold'>schedule</div>
        <div className=""><p>Here are your bookings to scheduled by the people on your calendar.</p>
        </div>
</div>
        <TabsList>
    <TabsTrigger value="modern">Modern View</TabsTrigger>
    <TabsTrigger value="table">Table View</TabsTrigger>
  </TabsList>
</div>
<div className="w-full py-4 flex justify-between items-center "> 
  <div className="w-[20%]">
<div className="space-y-2">
      <div className="relative">
        <Input className="peer pe-9 ps-9" placeholder="Search..." type="search" />
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
    </div>
</div>
               <TabHeader />
  </div>
  <TabsContent value="modern" className='w-full min-h-full h-full flex flex-wrap justify-start items-center'>
 
 <TabPanel
                isFetching={isFetching}
                meetings={meetings}
                period={period}
              />

      <ErrorAlert isError={isError} error={error} />

      {/* {isLoading || isError ? (
        <div className="flex items-center justify-center min-h-[30vh]">
          <Loader size="lg" color="black" />
        </div>
      ) : (
        <div className="w-full">
          <Card
            className="p-0 shadow-[0_1px_6px_0_rgb(0_0_0_/_10%)]
        min-h-[220px] border border-[#D4E16F)] bg-white rounded-[8px]
        "
          >
            <CardContent className="p-0 pb-3">
             
            </CardContent>
          </Card>
        </div>
      )} */}
   
 </TabsContent>
  <TabsContent value="table">Coming soon.</TabsContent>
</Tabs>



    </div> 
    </div>
    </div>
  );
};

export default Meetings;
