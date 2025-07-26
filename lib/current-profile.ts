// import { getServerSession } from "next-auth";
// import type { NextApiRequest, NextApiResponse } from "next";
// import type { GetServerSidePropsContext } from "next";
// import { authOptions } from "pages/api/auth/[...nextauth]"; // Adjust path as needed
// import { prisma } from "utils/db";

// // Create a type that works for both API routes and getServerSideProps
// type ServerContext = {
//   req: NextApiRequest | GetServerSidePropsContext["req"];
//   res: NextApiResponse | GetServerSidePropsContext["res"];
// };

// export const currentProfile = async (ctx: ServerContext) => {
//   try {
//     const session = await getServerSession(ctx.req, ctx.res, authOptions);
//     if (!session?.user?.id) return null;

//     return await prisma.profile.findUniqueOrThrow({
//       where: { userId: session.user.id }
//     });
//   } catch (error) {
//     console.error("Failed to fetch profile:", error);
//     return null;
//   }
// };