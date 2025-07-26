import NewEventDialog from "./new-event-dialog";

const EmptyState = () => {
  return (
    <div className="flex justify-center items-center h-screen max-h-[70%] w-full">
    <div
      className="flex flex-col items-center justify-center
     h-full w-full text-center">
      <img
        src="https://img.freepik.com/free-vector/date-picker-concept-illustration_114360-4495.jpg?t=st=1751978834~exp=1751982434~hmac=59e640f90ce63422b604bc75a4903ea45721e72af87ae5bfa38bf15b4dd016d3&w=2000"
        alt={"Create events"}
        className="w-[200px] rounded-md h-[200px] mb-3"
      />
      <h3 className="text-xl mb-[3px] font-semibold">
        Create scheduling links with event types
      </h3>
      <p className="font-light">
        Create event for schedule meetings with teams or collegues.
      </p>

      <div className="mt-5">
        <NewEventDialog btnVariant="default" />
      </div>
    </div>
    </div>
  );
};

export default EmptyState;
