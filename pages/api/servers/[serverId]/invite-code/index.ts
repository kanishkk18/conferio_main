// import { NextResponse } from "next/server";
// import { v4 as uuidv4 } from "uuid";

// // import { currentProfile } from "../../../users";
// import { prisma } from "utils/db";
// import { getSession } from "next-auth/react";

// export async function PATCH(
//   req: Request,
//   { params }: { params: { serverId: string } }
// ) {
//   try {
//     const session = await getSession();

//     if (!session) return new NextResponse("Unauthorized", { status: 401 });

//     if (!params.serverId)
//       return new NextResponse("Server ID Missing.", { status: 400 });

//     const server = await prisma.server.update({
//       where: {
//         id: params.serverId,
//         profileId: session.user?.id
//       },
//       data: {
//         inviteCode: uuidv4()
//       }
//     });

//     return NextResponse.json(server);
//   } catch (error) {
//     console.error("[SERVER_ID]", error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }
