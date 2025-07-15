import { Fragment } from "react";
import { Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MeetingType, PeriodType } from "types/api.type";
import { format, parseISO } from "date-fns";
import { locationOptions } from "@/lib/types";
import { PeriodEnum } from "hooks/use-meeting-filter";
import { Loader } from "@/components/loader";
import {
    Calendar,
    Clock,
    MapPin,
    MessageSquare,
    Users,
    Video,
  } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import {
    Expandable,
    ExpandableCard,
    ExpandableCardContent,
    ExpandableCardFooter,
    ExpandableCardHeader,
    ExpandableContent,
    ExpandableTrigger,
  } from "@/components/ui/expandable"
import Link from "next/link";
import Image from "next/image";


const MeetingCard = (props: {
  meeting: MeetingType;
  period: PeriodType;
  isPending: boolean;
  onCancel: () => void;
}) => {
  const { meeting, isPending, period, onCancel } = props;


  // Format the date and time
  const startTime = parseISO(meeting.startTime);
  const endTime = parseISO(meeting.endTime);
  const formattedDate = format(startTime, "EE, d MMMM yyyy"); // e.g., "Wednesday, 19 March 2025"
  const formattedTime = `${format(startTime, "h:mm a")} – ${format(
    endTime,
    "h:mm a"
  )}`;

  const locationOption = locationOptions.find(
    (option) => option.value === meeting.event.locationType
  );
  


  return (
    <div className="w-full">
      {/* <h2
        className="day-header p-[16px_24px] border-y
      border-[#D4E16F] bg-[#fafafa] text-base font-bold tracking-wide"
      >
        {formattedDate}
      </h2>

      <div role="buton" className="event-list-body" onClick={toggleDetails}>
        <div
          className="flex flex-row bg-white relative w-full p-6 text-left 
        cursor-pointer transition-colors duration-200 ease-in-out"
        >
          <div
            className="flex-shrink-0 box-border pr-4 pl-10 inline-block
          mb-[5px]"
          >
            <span className="event-time">{formattedTime}</span>
            <span
              className={cn(
                `absolute bg-primary/70
              top-[20px] left-[23px] inline-block box-border w-[30px]
             h-[30px] rounded-full`,
                period === PeriodEnum.CANCELLED && "!bg-destructive/70"
              )}

            ></span>
          </div>

          <div className="flex-1">
            <h5>
              <strong>{meeting.guestName}</strong>
            </h5>
            <p>
              Event type <strong> {meeting.event.title}</strong>
            </p>
          </div>
          

          <div className="flex shrink-0">
            <button className="flex gap-px items-center cursor-pointer !text-[rgba(26,26,26,0.61)] text-base leading-[1.4] whitespace-nowrap">
              <ChevronDown
                fill="rgba(26,26,26,0.61)"
                className=" w-6 h-6
               !fill-[rgba(26,26,26,0.61)]"
              />
              More
            </button>
          </div>
        </div>
      </div>

      <div
        ref={detailsRef}
        className="event-details overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: isShow ? `${detailsRef.current?.scrollHeight}px` : "0px",
          padding: isShow ? "8px 24px 24px 24px" : "0 24px",
        }}
      >
        <div className="flex flex-col-reverse md:flex-row pb-5">
          {period === PeriodEnum.UPCOMING && (
            <div className="box-border shrink-0 w-[80%] md:w-[310px] pr-[80px] pl-[40px] mb-5">
              <div>
                <Button
                  variant="outline"
                  type="button"
                  className="!w-full border-[#476788] text-[#0a2540] font-normal text-sm"
                  onClick={onCancel}
                >
                  {isPending ? (
                    <Loader color="black" />
                  ) : (
                    <Fragment>
                      <Trash2Icon />
                      <span>Cancel</span>
                    </Fragment>
                  )}
                </Button>
              </div>
            </div>
          )}
          <div className="flex-1">
            <ul>
              <li className="mb-4">
                <h5 className="inline-block mb-1 font-bold text-sm leading-[14px] uppercase">
                  Email
                </h5>
                <p className="font-normal text-[15px]">{meeting.guestEmail}</p>
              </li>
              <li className="mb-4">
                <h5 className="inline-block mb-1 font-bold text-sm leading-[14px] uppercase">
                  Location
                </h5>
                <div className="flex items-center mr-6">
                  {locationOption && (
                    <>
                      <img
                        src={locationOption?.logo as string}
                        alt={locationOption?.label}
                        className="w-5 h-5 mr-2"
                      />
                      <span className="mt-1 font-normal text-[15px]">
                        {locationOption?.label}
                      </span>
                    </>
                  )}
                </div>
              </li>
              <li className="mb-4">
                <h5 className="inline-block mb-1 font-bold text-sm leading-[14px] uppercase">
                  Questions
                </h5>
                <p className="font-normal text-[15px]">
                  {meeting.additionalInfo ? (
                    meeting.additionalInfo
                  ) : (
                    <Fragment>
                      <span className="block font-light text-sm mb-1 text-[rgba(26,26,26,0.61)]">
                        Please share anything that will help prepare for our
                        meeting.
                      </span>
                      <span>Nothing</span>
                    </Fragment>
                  )}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div> */}
      <Expandable
            expandDirection="both"
            expandBehavior="replace"
            initialDelay={0.2}
            onExpandStart={() => console.log("Expanding meeting card...")}
            onExpandEnd={() => console.log("Meeting card expanded!")}
          >
            {({ isExpanded }) => (
              <ExpandableTrigger>
                <ExpandableCard
                  className="w-full"
                  collapsedSize={{ width: 320, height: 240 }}
                  expandedSize={{ width: 420, height: 480 }}
                  hoverToExpand={false}
                  expandDelay={200}
                  collapseDelay={500}
                >
                  <ExpandableCardHeader>
                    <div className="flex justify-between items-start w-full">
                      <div>
                        <Badge
                          variant="secondary"
                          className="bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-100 mb-2"
                        >
                          In 15 mins </Badge>
                        <h3 className="font-semibold text-xl text-gray-800 dark:text-white">
                         {meeting.event.title.slice(0,12)}
                        </h3>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button size="icon" variant="outline" className="h-8 w-8">
                              <Calendar className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Add to Calendar</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </ExpandableCardHeader>
      
                  <ExpandableCardContent>
                    <div className="flex flex-col items-start justify-between mb-4">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{formattedTime}</span>
                      </div>
      
                      <ExpandableContent preset="blur-md">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="flex">{locationOption && (
                    <>
                      <Image 
                      height={1000}
                      width={1000}
                        src={locationOption?.logo as string}
                        alt={locationOption?.label}
                        className="w-5 h-5 mr-2"
                      />
                      <span className=" font-normal text-[15px]">
                        {locationOption?.label}
                      </span>
                    </>
                  )}</span>
                        </div>
                      </ExpandableContent>
                    </div>
                    <ExpandableContent preset="blur-md" stagger staggerChildren={0.2}>
                      <p className="text-sm text-gray-700 dark:text-gray-200 mb-4">
                       {meeting.additionalInfo ? (
                    meeting.additionalInfo
                  ) : (
                    <Fragment>
                      <span className="block font-light text-sm mb-1 text-[rgba(26,26,26,0.61)]">
                        Please share anything that will help prepare for our
                        meeting.
                      </span>
                      <span>Nothing</span>
                    </Fragment>
                  )}
                      </p>
                      <div className="mb-4">
                        <h4 className="font-medium text-sm text-gray-800 dark:text-gray-100 mb-2 flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          Attendees:
                        </h4>
                        <div className="flex -space-x-2 overflow-hidden">
                          {/* {["Alice", "Bob", "Charlie", "David"].map((name, index) => ( */}
                            <TooltipProvider >
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Avatar className="border-2 border-white dark:border-gray-800">
                                    <AvatarImage
                                      src={`/placeholder.svg?height=32&width=32&text=${meeting.guestName[0]}`}
                                      alt={meeting.guestName}
                                    />
                                    <AvatarFallback className="bg-blue-600 text-white">{meeting.guestName[0]}</AvatarFallback>
                                  </Avatar>
                                </TooltipTrigger>
                                <TooltipContent className="bg-white">
                                  <p className="text-blue-500">{meeting.guestName}</p>
                                  <p className="text-gray-600">{meeting.guestEmail}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          {/* ))} */}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Link href={meeting.meetLink}>
                        <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                          <Video className="h-4 w-4 mr-2" />
                          Join Meeting
                        </Button>
                        </Link>
                        <div className="flex items-center justify-center gap-2 w-full">
                        {isExpanded && (
                          <Button variant="outline" className="w-full">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Open Chat
                          </Button>
                        )}
                         {period === PeriodEnum.UPCOMING && (
           
             
                <Button
                  variant="outline"
                  type="button"
                  className="w-full"
                  onClick={onCancel}
                >
                  {isPending ? (
                    <Loader color="black" />
                  ) : (
                    <Fragment>
                      <Trash2Icon />
                      <span>Cancel</span>
                    </Fragment>
                  )}
                </Button>
          )}</div>
                      </div>
                    </ExpandableContent>
                  </ExpandableCardContent>
                  <ExpandableCardFooter>
                    <div className="flex items-center gap-2 justify-between w-full text-sm text-gray-600 dark:text-gray-300">
                      <span>Weekly</span>
                      <span>Next : {formattedDate}
</span>
                    </div>
                  </ExpandableCardFooter>
                </ExpandableCard>
              </ExpandableTrigger>
            )}
          </Expandable>
    </div>
  );
};

export default MeetingCard;

