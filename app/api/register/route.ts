import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcrypt";
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  const user = await prisma.user.findUnique({
    where: { email: validation.data.email },
  });
  if (user)
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  const hashedPassword = await bcrypt.hash(body.password, 10);
  const createdUser = await prisma.user.create({
    data: {
      email: validation.data.email,
      hashedPassword: hashedPassword,
    },
  });
  return NextResponse.json({ email: createdUser.email }, { status: 201 });
}
