import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { getToken } from "next-auth/jwt";

const f = createUploadthing();

export const ourFileRouter = {
  ServerImage: f({ image: { maxFileSize: "8MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      const token = await getToken({ req });
      if (!token?.id) {
        throw new UploadThingError("Unauthorized");
      }

      return { userId: token.id };
    })
    .onUploadComplete(() => {}),

  messageFile: f(["image", "pdf"])
    .middleware(async ({ req }) => {
      const token = await getToken({ req });
      if (!token?.id) {
        throw new UploadThingError("Unauthorized");
      }

      return { userId: token.id };
    })
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
