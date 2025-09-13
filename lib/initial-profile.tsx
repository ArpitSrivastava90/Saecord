import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";

export const initalProfile = async () => {
  const session = await getServerSession();
  const user = session?.user;

  if (!user?.email) {
    redirect("/signin");
  }

  let profile = await prisma.profile.findUnique({
    where: { email: user.email! },
  });

  if (profile) return profile;

  const customUser = await prisma.user.findUnique({
    where: { email: user.email! },
  });

  if (!customUser) {
    redirect("/signin");
  }

  const newProfile = await prisma.profile.create({
    data: {
      userId: customUser.id,
      email: user.email!,
      name: user.name ?? "No Name",
      imageUrl: user.image ?? "",
    },
  });

  return newProfile;
};
