import { FC, useState } from "react";
import EmptyPanel from "./empty-panel";
import { MeetingType, PeriodType } from "types/api.type";
import { Loader } from "@/components/loader";
import { PeriodEnum } from "hooks/use-meeting-filter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelMeetingMutationFn } from "@/lib/api";
import { toast } from "sonner";
import ActiveBookings from "@/components/ui/ActiveBookings";


interface PropsType {
  isFetching: boolean;
  period: PeriodType;
  meetings: MeetingType[];
}

const ActiveBookingPanel: FC<PropsType> = ({ period, meetings, isFetching }) => {
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
          queryKey: ["userMeetings"],
        });
        setPendingMeetingId(null);
        toast.success(`${response.message}`);
      },
      onError: () => {
        setPendingMeetingId(null);
        toast.success("Failed to cancel meeting");
      },
    });
  };

  return (
    <div className="w-full">
      {isFetching ? (
        <div className="flex flex-col items-center justify-center">
          <Loader size="lg" color="black" />
        </div>
      ) : meetings?.length === 0 ? (
        <EmptyPanel
          title={`No ${
            period === PeriodEnum.UPCOMING
              ? "Upcoming"
              : period === PeriodEnum.PAST
              ? "Past"
              : "Cancelled"
          } Meeting`}
        />
      ) : (
        <div className=" w-full">
          <ul className="w-full h-full space-x-4 flex items-center ">
            {meetings?.map((meeting) => (
              <li key={meeting.id} className="w-full h-full">
                
                <ActiveBookings
                period={period}
                  isPending={pendingMeetingId == meeting.id ? isPending : false}
                  meeting={meeting}
                  onCancel={() => handleCancel(meeting.id)}/>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ActiveBookingPanel;
