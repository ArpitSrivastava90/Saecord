import { IntialModal } from "@/components/modals/inita-modal";
import { initalProfile } from "@/lib/initial-profile";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
const SetupPage = async () => {
  const profile = await initalProfile();
  const server = await prisma.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  if (server) {
    return redirect(`servers/${server.id}`);
  }
  return <IntialModal />;
};

export default SetupPage;
