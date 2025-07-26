'use client';

import Navigation from '@/components/ui/overviewNavigation';
import StatsCard from '@/components/ui/StatsCard';
import CircularProgress from '@/components/ui/CircularProgress';
import { Calendar } from '@/components/ui/OverviewCalendar';
import ChartCard from '@/components/ui/ChartCard';
import { Button } from '@/components/ui/button';
import { ArrowRightIcon, ArrowUpRight } from 'lucide-react';
import Mainsidebar from '@/components/ui/mainSideBar';
// import { JitsiMeeting } from '@jitsi/react-sdk';
import useMeetingFilter from 'hooks/use-meeting-filter';
import { getUserMeetingsQueryFn } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import ActiveBookingPanel from 'pages/bookings/_components/activeBookingPanel';
import Link from 'next/link';
import UpcomingMeetingPanel from 'pages/bookings/_components/upcomingMeetingPanel';
import Image from 'next/image';
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

const Meetings = () => {
  const { period } = useMeetingFilter();

  const { data, isFetching } = useQuery({
    queryKey: ['userMeetings', period],
    queryFn: () => getUserMeetingsQueryFn(period),
  });

  const meetings = data?.meetings || [];

  return (
    <div className="min-h-screen flex dark:bg-black">
      <Mainsidebar />

      <ResizablePanelGroup
        direction="horizontal"
        className="max-w-full w-full md:min-w-[450px]"
      >
        <div className="absolute w-full max-w-[96%] mx-auto py-1 px-6">
          <Navigation />
        </div>
        <ResizablePanel defaultSize={50} className="pt-24 p-4 dark:bg-[#060606]">
          <div className="flex w-full gap-4 mt-8">
            <div className="">
              {/* Stats Row */}
              <div className=" w-fit flex gap-4 ">
                <div className="col-span-2">
                  <div className="bg-neutral-900 px-6 p-6 rounded-xl flex items-center justify-center h-full">
                    <CircularProgress percentage={70} />
                  </div>
                </div>
                <div className="col-span-2">
                  <StatsCard
                    title="Currently Booked"
                    value={meetings.length.toString()}
                    color="purple"
                  />
                </div>
              </div>

              {/* Balance and Chart Row */}
              <div className=" gap-4 mt-3 min-h-full">
                <div className="col-span-4 ">
                  <div className="green-card p-5 h-[158px] relative overflow-hidden ">
                    {/* Pattern overlay */}
                    <div className="absolute inset-0">
                      <svg width="100%" height="100%" className="opacity-10">
                        <pattern
                          id="pattern-zigzag"
                          width="30"
                          height="30"
                          patternUnits="userSpaceOnUse"
                        >
                          <path
                            d="M0 15 L15 0 L30 15 L15 30 Z"
                            fill="none"
                            stroke="white"
                            strokeWidth="1"
                          />
                        </pattern>
                        <rect
                          width="100%"
                          height="100%"
                          fill="url(#pattern-zigzag)"
                        />
                      </svg>
                    </div>

                    {/* Content */}
                    <div className="relative z-10 ">
                      <div className="flex justify-between items-start">
                        <h3 className="text-3xl font-semibold text-white -mt-2 mb-2 z-50 [text-shadow:_2px_2px_4px_rgba(0,0,0,0.6)]">
                          Schedule <br /> a meeting
                        </h3>
                        <img
                          className="rounded-t-[2.9rem] absolute -right-24"
                          src="https://res.cloudinary.com/kanishkkcloud18/image/upload/v1747576462/CONFERIO/evmztakxitrunclugusx.png"
                          alt=""
                        />
                      </div>
                      <Button
                        variant="secondary"
                        className="text-sm px-2 py-1 mt-2"
                      >
                        Do it now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* charcard */}
            <ChartCard />

            <div className="flex w-[22%] flex-col gap-4">
              <div className=" h-full ">
                <div className="px-4 py-2 flex bg-red-500 justify-between rounded-xl h-full flex-col">
                  <div className="flex justify-between items-center">
                    <h1 className="text-lg font-semibold [text-shadow:_2px_2px_4px_rgba(0,0,0,0.6)]">
                      My recordings
                    </h1>
                    <span className="text-sm text-white bg-black/70 rounded-full p-1">
                      <ArrowUpRight className="h-5 w-5" />{' '}
                    </span>
                  </div>
                  <div className="flex text-center justify-between  items-center">
                    <div className="font-bold text-2xl text-white">10</div>
                    <div className="overflow-hidden h-12 w-12 flex justify-center items-center rounded-full ">
                      <Image
                        height={1000}
                        width={1000}
                        className="h-full w-full object-cover"
                        src="https://res.cloudinary.com/kanishkkcloud18/image/upload/v1747587960/CONFERIO/i8p54hqyfxgndcw2lkbt.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
              <UpcomingMeetingPanel
                isFetching={isFetching}
                meetings={meetings}
                period={period}
              />
            </div>
          </div>

          {/* Bookings and Calendar Row */}
          <div className="min-w-full w-full gap-6 mt-2">
            <div className="flex justify-between items-center py-4 px-2">
              <h3 className="text-2xl font-semibold ">
                Active Bookings
              </h3>

              <Link
                href="/bookings/page"
                className="flex justify-center items-center gap-2"
              >
                <Button
                  variant="link"
                  className="text-sm text-blue-500 hover:underline p-0"
                >
                  View All
                </Button>
                <ArrowRightIcon className="h-4 w-4" />
              </Link>
            </div>

            <ActiveBookingPanel
              isFetching={isFetching}
              meetings={meetings}
              period={period}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle  className='bg-neutral-800 w-[1px]'/>
        <ResizablePanel defaultSize={26}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={100}>
              {/* <div className="col-span-12 lg:col-span-5 bg-black overflow-hidden h-screen "> */}
              <Calendar />
              {/* </div> */}
            </ResizablePanel>
            {/* <ResizableHandle /> */}
            {/* <ResizablePanel defaultSize={75}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Three</span>
            </div>
          </ResizablePanel> */}
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default Meetings;
