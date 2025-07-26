import { Calendar } from 'lucide-react';
import { CalendarGrid } from './calendar-grid';
import { EventSheet } from './event-sheet';
import { useCalendarStore } from 'store/calendar-store';
import useMeetingFilter from 'hooks/use-meeting-filter';
import { getUserMeetingsQueryFn } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { MainCalendarHeader } from './maincalendar-header';

export const CalendarLayout = () => {
  const { view } = useCalendarStore();
  const { period } = useMeetingFilter();
  
    const { data, isFetching } = useQuery({
      queryKey: ['userMeetings', period],
      queryFn: () => getUserMeetingsQueryFn(period),
    });
  
    const meetings = data?.meetings || [];

  return (
    <div className="h-full flex flex-col bg-gradient-subtle min-h-screen">
      {/* <MainCalendarHeader/> */}
      <div className="flex-1 overflow-hidden">
        {view === 'month' && <CalendarGrid 
         isFetching={isFetching}
                meetings={meetings}
                period={period}/>}
        {/* Week and Day views can be implemented later */}
        {view === 'week' && (
          <div className="flex-1 flex items-center justify-center bg-gradient-subtle p-8">
            <div className="text-center space-y-6 max-w-md">
              <div className="w-24 h-24 mx-auto bg-gradient-primary rounded-2xl flex items-center justify-center shadow-elegant">
                <Calendar className="h-12 w-12 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Week View</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Week view is coming soon! We're building an amazing weekly schedule view for you.
                </p>
              </div>
            </div>
          </div>
        )}
        {view === 'day' && (
          <div className="flex-1 flex items-center justify-center bg-gradient-subtle p-8">
            <div className="text-center space-y-6 max-w-md">
              <div className="w-24 h-24 mx-auto bg-gradient-primary rounded-2xl flex items-center justify-center shadow-elegant">
                <Calendar className="h-12 w-12 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Day View</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Day view is coming soon! We're creating a detailed daily schedule view for better focus.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <EventSheet />
    </div>
  );
};