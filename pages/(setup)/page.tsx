// import React from "react";
// import { redirect } from "next/navigation";

// import { initialProfile } from "@/lib/initial-profile";
// import { prisma } from "utils/db";
// import { InitialModal } from "@/components/chat-components/modals/initial-modal";

// export default async function SetupPage() {
//   const profile = await initialProfile();

//   const server = await prisma.server.findFirst({
//     where: {
//       members: {
//         some: {
//           profileId: profile.id
//         }
//       }
//     }
//   });

//   if (server) return redirect(`/servers/${server.id}`);

//   return <InitialModal />;
// }


const SetupPage = () => {
  return (
    <div className=""> contact</div>
  )
}

export default SetupPage;