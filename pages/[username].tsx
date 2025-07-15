// // pages/[username].tsx
// import { GetServerSideProps } from "next";
// import PageContainer from "./external_page/_components/page-container";

// interface Props {
//   username: string;
// }

// export default function PublicUserPage({ username }: Props) {
//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold">Public page for {username}</h1>
//       {/* You can add user public events here */}
//     </div>
//   );
// }

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const username = context.params?.username as string;

//   // Optional: Check if user exists in DB
//   // const user = await fetchUserByUsername(username);
//   // if (!user) return { notFound: true };

//   return {
//     props: {
//       username,
//     },
//   };
// };

// pages/[username].tsx

// import { GetServerSideProps } from "next";
// import { getAllPublicEventQueryFn } from "@/lib/api";
// import { ArrowRight, Clock } from "lucide-react";
// import Link from "next/link";

// interface Props {
//   username: string;
//   events: any[];
//   user: any;
// }

// export default function PublicUserPage({ username, events, user }: Props) {
//     // const param = useParams();
//     //   const username = param.username as string;
    
//     //   const { data, isFetching, isLoading, isError, error } = useQuery({
//     //     queryKey: ["public_events"],
//     //     queryFn: () => getAllPublicEventQueryFn(username),
//     //   });
    
//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <h1 className="text-2xl font-semibold mb-2 text-center capitalize">
//         {user?.name}
//       </h1>
//       <p className="text-center text-sm text-gray-500 mb-8">
//         Welcome to my scheduling page. Please follow the instructions to book a meeting.
//       </p>

//       <div className=" w-full mx-auto flex flex-wrap">
//         {events?.map((event, index) => (
//           <Link
//             key={index}
//             href={`/${username}/${event.slug}`}
//             className="group flex-[0_1_calc(100%-40px)] md:flex-[0_1_calc(50%-40px)] min-h-[150px] m-5 p-5 pr-1 border-t border-[rgba(26,26,26,0.1)] transition-all hover:!bg-[#e5efff] hover:shadow-xs"
//           >
//             <div className="flex flex-col">
//               <h2 className="flex items-center justify-between text-lg font-semibold">
//                 <span className="flex-1 capitalize">{event.title}</span>
//                 <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
//               </h2>
//               <p className="text-sm capitalize text-gray-600 line-clamp-2 min-h-5">
//                 {event.description || "No description available"}
//               </p>
//               <p className="inline-flex items-center mt-3 text-sm bg-[#d2e1f9] px-2 py-1 max-w-24 whitespace-nowrap rounded-sm">
//                 <Clock className="w-4 h-4 mr-2" />
//                 <span>{event.duration} mins</span>
//               </p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const username = context.params?.username as string;

//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/event-type/list-public/${username}`
//     );
//     const data = await res.json();

//     return {
//       props: {
//         username,
//         events: data?.events || [],
//         user: data?.user || null,
//       },
//     };
//   } catch (err) {
//     return {
//       props: {
//         username,
//         events: [],
//         user: null,
//       },
//     };
//   }
// };


import { useRouter } from "next/router";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import PageContainer from "../pages/external_page/_components/page-container";
import { useQuery } from "@tanstack/react-query";
import { getAllPublicEventQueryFn } from "@/lib/api";
import { ErrorAlert } from "@/components/ErrorAlert";
import { Loader } from "@/components/loader";

const UserEventsPage = () => {
  const router = useRouter();
  const username = router.query.username as string;

  const { data, isFetching, isLoading, isError, error } = useQuery({
    queryKey: ["public_events"],
    queryFn: () => getAllPublicEventQueryFn(username),
  });

  const events = data?.events || [];
  const user = data?.user;

  return (
    <PageContainer isLoading={isLoading}>
      {/* {Error Alert } */}
      <ErrorAlert isError={isError} error={error} />

      {isFetching || isError ? (
        <div className="flex items-center justify-center min-h-[15vh]">
          <Loader size="lg" color="black" />
        </div>
      ) : (
        <>
          {/* {Booking Content } */}
          <div className="py-5">
            <div className="w-full p-[25px_15px]">
              <div className="m-[0px_auto_20px] text-center max-w-xs flex flex-col items-center justify-center">
                <h1 className="text-lg font-semibold mb-3 capitalize">
                  {user?.name}
                </h1>
                <p className="px-5 text-sm font-light text-[rgba(26,26,26,0.61)]">
                  Welcome to my scheduling page. Please follow the instructions
                  to add an event to my calendar.
                </p>
              </div>

              {/* {Events List} */}
              <div className="md:max-w-[800px] w-full mx-auto flex flex-wrap">
                {events?.map((event, index) => (
                  <Link
                    key={index}
                    href={`/${username}/${event.slug}`}
                    className="group flex-[0_1_calc(100%-40px)] md:flex-[0_1_calc(50%-40px)] min-h-[150px] m-5 p-5 pr-1 border-t border-[rgba(26,26,26,0.1)] transition-all hover:!bg-[#e5efff] hover:shadow-xs"
                  >
                    <div className="flex flex-col">
                      <h2 className="flex items-center justify-between text-lg font-semibold">
                        <span className="flex-1 capitalize">{event.title}</span>
                        <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </h2>
                      <p className="text-sm capitalize text-gray-600 line-clamp-2 min-h-5">
                        {event.description
                          ? event.description
                          : "No description available"}
                      </p>
                      <p
                        className="inline-flex items-center mt-3 text-sm bg-[#d2e1f9] 
                      px-2 py-1 max-w-24 whitespace-nowrap rounded-sm"
                      >
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{event.duration} mins</span>
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </PageContainer>
  );
};

export default UserEventsPage;
