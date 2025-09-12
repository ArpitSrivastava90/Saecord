import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      firstname?: string | null;
      lastname?: string | null;
    };
  }

  interface JWT {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    firstname?: string | null;
    lastname?: string | null;
  }

  interface User {
    id: string;
    firstname?: string | null;
    lastname?: string | null;
  }
}
