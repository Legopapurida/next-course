import { NextRequest, NextResponse } from "next/server";
import products from "./productDB";
import schema from "./schema";

export function GET() {
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });
  products.push({
    id: products[products.length - 1].id + 1,
    ...validation.data,
  });
  return NextResponse.json(products, { status: 201 });
}
