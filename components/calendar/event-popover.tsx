import React, { useRef } from "react";
import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import dayjs from "dayjs";
import {
  // HiOutlineMenuAlt2,
  HiOutlineMenuAlt4,
  // HiOutlineUsers,
} from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
// import { IoMdCalendar } from "react-icons/io";
// import { FiClock } from "react-icons/fi";
// import AddTime from "./add-time";
// import { createEvent } from "pages/api/event-actions";
// import { cn } from "../../lib/utils";

interface EventPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  date: string;
}

export default function EventPopover({
  onClose,
}: EventPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  // const [selectedTime, setSelectedTime] = useState("00:00");
  // const [error, setError] = useState<string | null>(null);
  // const [success, setSuccess] = useState<boolean | null>(null);
  // const [isPending, startTransition] = useTransition();

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       popoverRef.current &&
  //       !popoverRef.current.contains(event.target as Node)
  //     ) {
  //       onClose();
  //     }
  //   };

  //   if (isOpen) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [isOpen, onClose]);

  

  // const handlePopoverClick = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  // };

  // async function onSubmit(formData: FormData) {
  //   setError(null);
  //   setSuccess(null);
  //   startTransition(async () => {
  //     try {
  //       const result = await createEvent(formData);
  //       if ("error" in result) {
  //         setError(result.error);
  //       } else if (result.success) {
  //         setSuccess(result.success);
  //         setTimeout(() => {
  //           onClose();
  //         }, 2000);
  //       }
  //     } catch {
  //       setError("An unexpected error occurred. Please try again.");
  //     }
  //   });
  // }

  const handlePopoverClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleClose}
    >
      <div
        ref={popoverRef}
        className="w-full max-w-md h-2xl rounded-lg bg-white dark:bg-neutral-950 shadow-lg"
        onClick={handlePopoverClick}
      >
        <div className="mb-2 flex items-center justify-between rounded-md bg-slate-100 dark:bg-neutral-800 p-1">
          <HiOutlineMenuAlt4 />
          <Button
            variant="ghost"
            size="icon"
            type="button"
            onClick={handleClose}
          >
            <IoCloseSharp className="h-4 w-4" />
          </Button>
        </div>
        {/* <form className="space-y-4 p-6" action={onSubmit}>
          <div>
            <Input
              type="text"
              name="title"
              placeholder="Add title"
              className="my-4 rounded-none border-0 border-b text-2xl focus-visible:border-b-2 focus-visible:border-b-blue-600 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          <div className="flex items-center justify-between">
            <Button className="bg-blue-100 text-blue-700 hover:bg-blue-100 hover:text-blue-700">
              Event
            </Button>
            <Button type="button" variant="ghost">
              Task
            </Button>
            <Button type="button" variant="ghost">
              Appointmet Schedule <sup className="bg-blue-500">new</sup>
            </Button>
          </div>

          <div className="flex items-center space-x-3">
            <FiClock className="size-5 text-gray-600" />
            <div className="flex items-center space-x-3 text-sm">
              <p>{dayjs(date).format("dddd, MMMM D")}</p>
              <AddTime onTimeSelect={setSelectedTime} />
              <input type="hidden" name="date" value={date} />
              <input type="hidden" name="time" value={selectedTime} />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <HiOutlineUsers className="size-5 text-slate-600" />
            <Input
              type="text"
              name="guests"
              placeholder="Add guests"
              className={cn(
                "w-full rounded-lg border-0 bg-slate-100 dark:bg-neutral-900 pl-7 placeholder:text-slate-600 dark:placeholder:text-white/40",
                "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0",
              )}
            />
          </div>

          <div className="flex items-center space-x-3">
            <HiOutlineMenuAlt2 className="size-5 text-slate-600" />
            <Input
              type="text"
              name="description"
              placeholder="Add description"
              className={cn(
                "w-full rounded-lg border-0 bg-slate-100 dark:bg-neutral-900 pl-7 placeholder:text-slate-600 dark:placeholder:text-white/40",
                "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0",
              )}
            />
          </div>

          <div className="flex items-center space-x-3">
            <IoMdCalendar className="size-5 text-slate-600" />
            <div className="">
              <div className="flex items-center space-x-3 text-sm">
                {" "}
                <p>kanishkk</p>{" "}
                <div className="h-4 w-4 rounded-full bg-violet-500"></div>{" "}
              </div>
              <div className="flex items-center space-x-1 text-xs">
                <span>Busy</span>
                <div className="h-1 w-1 rounded-full bg-gray-500"></div>
                <span>Default visibility</span>{" "}
                <div className="h-1 w-1 rounded-full bg-gray-500"></div>
                <span>Notify 30 minutes before</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
          </div>

          {error && <p className="mt-2 px-6 text-red-500">{error}</p>}
          {success && <p className="mt-2 px-6 text-green-500">Success</p>}
        </form> */}
<div className="mt-4 p-4 text-center text-sm text-gray-500">
          Sorry we are currently working on this feature. Please check back later.
        </div>
      </div>
    </div>
  );
}
