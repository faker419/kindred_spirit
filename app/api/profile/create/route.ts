import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma";


export async function POST(req: NextRequest) {
  const { id, fullName } = await req.json()

  const existing = await prisma.profile.findUnique({ where: { id } })
  if (!existing) {
    const profile = await prisma.profile.create({
      data: { id, fullName },
    })
    return NextResponse.json(profile)
  }

  return NextResponse.json(existing)
}