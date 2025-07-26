"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import dayjs from "dayjs";
import { useDateStore , useViewStore } from "@/lib/store";
import { Button } from "../../ui/button";
import { ThemeToggle } from "../../ui/ThemeToggle";

export default function HeaderRight() {
  const todaysDate = dayjs();
  const { setDate, setMonth} =
    useDateStore();
    const { selectedView } = useViewStore();
  const { setView } = useViewStore();

  const handleTodayClick = () => {
    switch (selectedView) {
      case "month":
        setMonth(dayjs().month());
        break;
      case "week":
        setDate(todaysDate);
        break;
      case "day":
        setDate(todaysDate);
        setMonth(dayjs().month());
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex justify-center items-center space-x-4">

<ThemeToggle />
    {/* <SearchComponent /> */}
    <Button variant="outline" onClick={handleTodayClick}>
        Today
      </Button>
    <Select onValueChange={(v) => setView(v)}>
      <SelectTrigger className="w-24 font-medium focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0">
        <SelectValue placeholder="Month" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="month">Month</SelectItem>
        <SelectItem value="week">Week</SelectItem>
        <SelectItem value="day">Day</SelectItem>
      </SelectContent>
    </Select>

    <Avatar>
      <AvatarImage src="/img/inst2.png" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  </div>
  )
}
