import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";
import { Prisma } from "@prisma/client";
interface Props {
  params: { id: string };
}

export async function GET(request: NextRequest, { params: { id } }: Props) {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });
  if (user) return NextResponse.json(user);
  return NextResponse.json(
    {
      error: "User not found",
    },
    { status: 404 }
  );
}

export async function PUT(request: NextRequest, { params: { id } }: Props) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!user)
    return NextResponse.json(
      {
        error: "User not found",
      },
      { status: 404 }
    );
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      name: validation.data.name,
      email: validation.data.email,
    },
  });
  return NextResponse.json(updatedUser);
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
  try {
    const deletedUser = await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    return NextResponse.json(deletedUser, { status: 200 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2015")
        return NextResponse.json(
          {
            error: "User not found",
          },
          { status: 404 }
        );
    }
  }
}
