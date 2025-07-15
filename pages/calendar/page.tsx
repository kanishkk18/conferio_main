import Calendar from "@/components/calendar/calendar";
import React from "react";

const CalendarPage: React.FC = () => {
  return (
    <main>
      <Calendar />
      {/* <Calendar dbEvents={[]} /> */}
    </main>
  );
};

export default CalendarPage;