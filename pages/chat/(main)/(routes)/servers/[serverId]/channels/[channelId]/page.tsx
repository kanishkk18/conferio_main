// import React from "react";
// import { redirectToSignIn } from "@clerk/nextjs";
// import { redirect } from "next/navigation";
// import { ChannelType } from "@prisma/client";

// import { currentProfile } from "@/lib/current-profile";
// import { prisma } from "utils/db";
// import { ChatHeader } from "@/components/chat-components/chat/chat-header";
// import { ChatInput } from "@/components/chat-components/chat/chat-input";
// import { ChatMessages } from "@/components/chat-components/chat/chat-messages";
// import { MediaRoom } from "@/components/chat-components/media-room";

// interface ChannelIdPageProps {
//   params: {
//     serverId: string;
//     channelId: string;
//   };
// }

// export default async function ChannelIdPage({
//   params: { channelId, serverId }
// }: ChannelIdPageProps) {
//   const profile = await currentProfile();

//   if (!profile) return redirectToSignIn();

//   const channel = await prisma.channel.findUnique({
//     where: { id: channelId }
//   });

//   const member = await prisma.member.findFirst({
//     where: { serverId: serverId, profileId: profile.id }
//   });

//   if (!channel || !member) return redirect("/");

//   return (
//     <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
//       <ChatHeader
//         name={channel.name}
//         serverId={channel.serverId}
//         type="channel"
//       />
//       {channel.type === ChannelType.TEXT && (
//         <>
//           <ChatMessages
//             member={member}
//             name={channel.name}
//             chatId={channel.id}
//             type="channel"
//             apiUrl="/api/messages"
//             socketUrl="/api/socket/messages"
//             socketQuery={{
//               channelId: channel.id,
//               serverId: channel.serverId
//             }}
//             paramKey="channelId"
//             paramValue={channel.id}
//           />
//           <ChatInput
//             name={channel.name}
//             type="channel"
//             apiUrl="/api/socket/messages"
//             query={{
//               channelId: channel.id,
//               serverId: channel.serverId
//             }}
//           />
//         </>
//       )}
//       {channel.type === ChannelType.AUDIO && (
//         <MediaRoom chatId={channel.id} video={false} audio={true} />
//       )}
//       {channel.type === ChannelType.VIDEO && (
//         <MediaRoom chatId={channel.id} video={true} audio={true} />
//       )}
//     </div>
//   );
// }

const ChannelIdPage = () => {
  return (
    <div className=""> contact</div>
  )
}

export default ChannelIdPage;