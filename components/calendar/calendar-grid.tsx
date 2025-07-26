import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  parseISO,
} from 'date-fns';
import { useCalendarStore } from '../../store/calendar-store';
import { cn } from '@/lib/utils';
import { FC, useState } from 'react';
import { MeetingType, PeriodType } from 'types/api.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelMeetingMutationFn } from '@/lib/api';
import { toast } from 'sonner';
import CalendarMeeting from 'pages/bookings/_components/calender-meeting';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface PropsType {
  isFetching: boolean;
  period: PeriodType;
  meetings: MeetingType[];
}

export const CalendarGrid: FC<PropsType> = ({ period, meetings, isFetching }) => {
  const [pendingMeetingId, setPendingMeetingId] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: cancelMeetingMutationFn,
  });

  const handleCancel = (meetingId: string) => {
    setPendingMeetingId(meetingId);
    mutate(meetingId, {
      onSuccess: (response) => {
        queryClient.invalidateQueries({
          queryKey: ['userMeetings'],
        });
        setPendingMeetingId(null);
        toast.success(`${response.message}`);
      },
      onError: () => {
        setPendingMeetingId(null);
        toast.error('Failed to cancel meeting');
      },
    });
  };

  const { currentDate, events, openEventSheet, setSelectedDate } = useCalendarStore();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd,
  });

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    openEventSheet();
  };

  const handleEventClick = (event: React.MouseEvent, eventData: any) => {
    event.stopPropagation();
    openEventSheet(eventData);
  };

  return (
    <div className="flex-1 p-8 bg-gradient-subtle">
      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="py-3 px-3 text-center text-sm font-semibold text-muted-foreground bg-background/60 backdrop-blur-sm rounded-xl border border-border/30 shadow-sm"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 p-1 rounded-none bg-background/40 backdrop-blur-sm border border-border/30 shadow-elegant">
        {calendarDays.map((day, index) => {
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isTodayDate = isToday(day);

          // Filter meetings for this day
          const dayMeetings = meetings.filter(
            (meeting) =>
              format(parseISO(meeting.startTime), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
          );

          return (
            <div
              key={index}
              onClick={() => handleDayClick(day)}
              className={cn(
                'h-[120px] p-1 backdrop-blur-sm border border-border/20 cursor-pointer group',
                'transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-elegant hover:bg-background',
                'hover:border-primary/30 hover:ring-2 hover:ring-primary/10',
                !isCurrentMonth && 'text-muted-foreground bg-muted/40 opacity-60',
                isTodayDate && 'bg-primary/5 border-primary/40 ring-2 ring-primary/20 shadow-soft'
              )}
            >
              <div
                className={cn(
                  'flex items-center justify-between mb-3',
                  isTodayDate && 'text-primary'
                )}
              >
                <span
                  className={cn(
                    'text-sm font-semibold w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200',
                    isTodayDate && 'bg-primary text-primary-foreground shadow-sm',
                    !isTodayDate && 'group-hover:bg-primary/10 group-hover:text-primary'
                  )}
                >
                  {format(day, 'd')}
                </span>
                {dayMeetings.length > 0 && (
                  <div className="w-2 h-2 rounded-full bg-primary/60 group-hover:bg-primary transition-colors duration-200" />
                )}
              </div>

              <div className="">
                {dayMeetings.map((meeting) => (
                  <div key={meeting.id} className="w-full h-full">
                    <CalendarMeeting
                      period={period}
                      isPending={pendingMeetingId === meeting.id ? isPending : false}
                      meeting={meeting}
                      onCancel={() => handleCancel(meeting.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
