import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { subMoodIds } = await req.json();

    if (!Array.isArray(subMoodIds) || subMoodIds.length === 0) {
      return NextResponse.json({ error: "No submoods provided" }, { status: 400 });
    }

    // Step 1: Fetch all related topics through SubMoodTopic
    const subMoodTopics = await prisma.subMoodTopic.findMany({
      where: {
        subMoodId: { in: subMoodIds.map((id) => Number(id)) },
      },
      include: {
        topic: true,
      },
    });

    // Step 2: Deduplicate topics and take highest relevance
    const topicMap = new Map<number, { topic: any; relevance: number }>();

    for (const item of subMoodTopics) {
      const { topic, relevance } = item;
      if (!topicMap.has(topic.id) || (relevance ?? 0) > (topicMap.get(topic.id)?.relevance ?? 0)) {
        topicMap.set(topic.id, { topic, relevance: relevance ?? 0 });
      }
    }

    // Step 3: Sort by relevance (descending) and take top 10
    const sortedTopics = Array.from(topicMap.values())
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, 10)
      .map((t) => t.topic);

    return NextResponse.json(sortedTopics);
  } catch (err) {
    console.error("Error fetching topics by submoods:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
