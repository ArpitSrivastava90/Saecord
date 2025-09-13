import { getServerSession } from "next-auth";
import { prisma } from "./prisma";

export const currentProfile = async () => {
  const session = await getServerSession();
  const userEmail = session?.user.email;
  if (!userEmail) {
    return null;
  }
  const profile = await prisma.profile.findUnique({
    where: {
      email: userEmail,
    },
  });

  return profile;
};
