import { FC, useState } from "react";
import EmptyPanel from "./empty-panel";
import MeetingCard from "./meeting-card";
import { MeetingType, PeriodType } from "types/api.type";
import { Loader } from "@/components/loader";
import { PeriodEnum } from "hooks/use-meeting-filter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelMeetingMutationFn } from "@/lib/api";
import { toast } from "sonner";

interface PropsType {
  isFetching: boolean;
  period: PeriodType;
  meetings: MeetingType[];
}

const TabPanel: FC<PropsType> = ({ period, meetings, isFetching }) => {
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
    <div className="w-full overflow-hidden pt-2 pb-12">
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
        <div className="data--list">
          <ul className="w-full flex flex-wrap items-center ">
            {meetings?.map((meeting) => (
              <li key={meeting.id}>
                <MeetingCard
                  period={period}
                  isPending={pendingMeetingId == meeting.id ? isPending : false}
                  meeting={meeting}
                  onCancel={() => handleCancel(meeting.id)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TabPanel;
