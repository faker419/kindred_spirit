import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const moods = await prisma.mood.findMany({
    include: {
      subMoods: {
        select: { id: true, name: true },
      },
    },
  });
  return NextResponse.json(moods);
}
