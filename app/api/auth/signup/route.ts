import { prisma } from "@/lib/prisma";
import { SignupSchema } from "@/lib/validations";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ hello: "hii" });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedData = SignupSchema.safeParse(body);
    if (!parsedData.success) {
      return NextResponse.json(
        { error: "Invalid inputs", success: false },
        { status: 400 }
      );
    }

    const { firstname, lastname, email, password } = parsedData.data;
    const name = firstname;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists", success: false },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        lastname,
        password: hashedPassword,
      },
    });

    if (user) {
      return NextResponse.json(
        {
          message: "User created successfully",
          success: true,
        },
        { status: 201 }
      );
    }
  } catch (err) {
    console.error("Signup Error:", err);
    return NextResponse.json(
      {
        error: "Internal server error",
        success: false,
      },
      { status: 500 }
    );
  }
}
