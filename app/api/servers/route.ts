import { currentProfile } from "@/lib/current-profile";
import { prisma } from "@/lib/prisma";
import { MemberRole } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const { name, imageUrl } = await req.json();
    const profile = await currentProfile();
    if (!profile) {
      return NextResponse.json("Unauthorized", { status: 400 });
    }

    const server = await prisma.server.create({
      data: {
        profile: { connect: { id: profile.id } },
        name,
        imageUrl,
        channels: {
          create: [
            {
              name: "general",
              profile: { connect: { id: profile.id } },
            },
          ],
        },
        members: {
          create: [
            {
              profile: { connect: { id: profile.id } },
              role: MemberRole.ADMIN,
            },
          ],
        },
        inviteCode: uuidv4(),
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ Message: "Internal Error" }, { status: 500 });
  }
}
