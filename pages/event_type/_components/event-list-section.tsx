import { EventType } from "types/api.type";
import EventCard from "./event-card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleEventVisibilityMutationFn } from "@/lib/api";
import { toast } from "sonner";
import { useState } from "react";

const EventListSection = (props: { events: EventType[]; username: string }) => {
  const { events, username } = props;
  const [pendingEventId, setPendingEventId] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: toggleEventVisibilityMutationFn,
  });

  const toggleEventVisibility = (eventId: string) => {
    setPendingEventId(eventId);
    mutate(
      {
        eventId: eventId,
      },
      {
        onSuccess: (response) => {
          queryClient.invalidateQueries({
            queryKey: ["event_list"],
          });
          setPendingEventId(null);
          toast.success(`${response.message}`);
        },
        onError: () => {
          toast.success("Failed to switch event");
        },
      }
    );
  };
  return (
    <div className="w-full rounded-md overflow-hidden border dark:border-neutral-800">
      
        {events?.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            title={event.title}
            slug={event.slug}
            duration={event.duration}
            isPrivate={event.isPrivate}
            username={username}
            isPending={pendingEventId === event.id ? isPending : false}
            onToggle={() => toggleEventVisibility(event.id)}
          />
        ))}
    </div>
  );
};

export default EventListSection;
