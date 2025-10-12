import { PrismaClient } from "@prisma/client";

export async function seedTopics(prisma: PrismaClient) {


const topics = [
    {
    name: "Managing Intense Emotions",
    category: "Emotional Regulation",
    description: "Learning to stay grounded when emotions feel overwhelming.",
    subMoods: [{ name: "Hysterical", relevance: 4 }],
  },
    {
    name: "Navigating Uncertainty",
    category: "Self-Discovery",
    description: "Developing calm and clarity when life feels unpredictable.",
    subMoods: [{ name: "Bewildered", relevance: 4 }],
  },
    {
    name: "Managing Anger",
    category: "Emotional Regulation",
    description: "Understanding and transforming anger into constructive action.",
    subMoods: [
      { name: "Hostile", relevance: 5 },
      { name: "Annoyed", relevance: 4 },
    ],
  },
    {
    name: "Overcoming Shame",
    category: "Healing",
    description: "Releasing the burden of guilt and embracing self-acceptance.",
    subMoods: [
      { name: "Mortified", relevance: 5 },
      { name: "Revolted", relevance: 4 },
      { name: "Mortified", relevance: 3 }
    ],
  },
    {
    name: "Managing Expectations",
    category: "Mindfulness",
    description:
      "Balancing ambition with acceptance to reduce frustration and disappointment.",
    subMoods: [
      { name: "Frustrated", relevance: 5 },
      { name: "Displeased", relevance: 3 },
    ],
  },
  {
    name: "Cultivating Joy in Daily Life",
    category: "Positive Psychology",
    description: "Learning to notice and amplify small moments of joy throughout the day.",
    subMoods: [
      { name: "Joyful", relevance: 5 },
      { name: "Blissful", relevance: 4 },
      { name: "Delighted", relevance: 3 },
      { name: "Jubilation", relevance: 5 }
    ],
  },
  {
    name: "Living with Purpose",
    category: "Self-Discovery",
    description: "Finding direction and meaning aligned with your values and passions.",
    subMoods: [
      { name: "Hopeful", relevance: 5 },
      { name: "Eager", relevance: 4 },
      { name: "Excited", relevance: 3 },
    ],
  },
  {
    name: "Building Emotional Resilience",
    category: "Mental Strength",
    description: "Developing inner tools to adapt and grow through life’s challenges.",
    subMoods: [
      { name: "Zeal", relevance: 4 },
      { name: "Triumphant", relevance: 3 },
    ],
  },
  {
    name: "Mindful Gratitude Practice",
    category: "Mindfulness",
    description: "Nurturing appreciation and perspective through mindful reflection.",
    subMoods: [
      { name: "Thankful", relevance: 5 },
      { name: "Appreciative", relevance: 4 },
      { name: "Pleased", relevance: 3 },
    ],
  },
  {
    name: "Healing from Heartbreak",
    category: "Healing",
    description: "Processing emotional loss and rediscovering self-worth and love.",
    subMoods: [
      { name: "Hurt", relevance: 5 },
      { name: "Sorrow", relevance: 4 },
      { name: "Grief", relevance: 3 },
    ],
  },
  {
    name: "Overcoming Anger and Resentment",
    category: "Emotional Regulation",
    description: "Learning to express anger constructively and release lingering resentment.",
    subMoods: [
      { name: "Angry", relevance: 5 },
      { name: "Resentful", relevance: 4 },
      { name: "Agitated", relevance: 3 },
      { name: "Revolted", relevance: 2 },
    ],
  },
  {
    name: "Letting Go of Guilt and Shame",
    category: "Self-Compassion",
    description: "Freeing yourself from emotional burdens through forgiveness and understanding.",
    subMoods: [
      { name: "Guilty", relevance: 5 },
      { name: "Regretful", relevance: 4 },
      { name: "Powerless", relevance: 3 },
    ],
  },
  {
    name: "Managing Stress and Anxiety",
    category: "Well-being",
    description: "Techniques to calm your body and mind in moments of tension or worry.",
    subMoods: [
      { name: "Anxious", relevance: 5 },
      { name: "Worried", relevance: 4 },
      { name: "Helpless", relevance: 3 },
    ],
  },
  {
    name: "Self-Esteem and Inner Confidence",
    category: "Personal Growth",
    description: "Building self-worth and recognizing your unique strengths.",
    subMoods: [
      { name: "Illustrious", relevance: 4 },
      { name: "Satisfied", relevance: 3 },
    ],
  },
  {
    name: "Overcoming Fear of Failure",
    category: "Motivation",
    description: "Transforming fear into fuel for growth and experimentation.",
    subMoods: [
      { name: "Inferior", relevance: 5 },
      { name: "Inadequate", relevance: 4 },
      { name: "Panicked", relevance: 3 },
    ],
  },
  {
    name: "Healing from Loneliness",
    category: "Connection",
    description: "Finding belonging and emotional intimacy after periods of isolation.",
    subMoods: [
      { name: "Lonely", relevance: 5 },
      { name: "Isolated", relevance: 4 },
    ],
  },
  {
    name: "Transforming Jealousy into Inspiration",
    category: "Self-Awareness",
    description: "Using envy as a tool for self-discovery and motivation.",
    subMoods: [
      { name: "Jealous", relevance: 5 },
      { name: "Resentful", relevance: 4 },
      { name: "Aggravated", relevance: 3 },
    ],
  },
  {
    name: "Rediscovering Playfulness",
    category: "Joyful Living",
    description: "Inviting creativity and fun back into everyday life.",
    subMoods: [
      { name: "Amused", relevance: 5 },
      { name: "Pleased", relevance: 4 },
      { name: "Enthralled", relevance: 3 },
    ],
  },
  {
    name: "Mind-Body Awareness",
    category: "Mindfulness",
    description: "Understanding how physical sensations reflect emotional states.",
    subMoods: [
      { name: "Rapture", relevance: 5 },
      { name: "Euphoric", relevance: 4 },
      { name: "Excited", relevance: 3 },
    ],
  },
  {
    name: "Dealing with Disappointment",
    category: "Resilience",
    description: "Recovering from unmet expectations with patience and grace.",
    subMoods: [
      { name: "Dismayed", relevance: 5 },
      { name: "Displeased", relevance: 4 },
      { name: "Regretful", relevance: 3 },
    ],
  },
  {
    name: "Coping with Uncertainty",
    category: "Emotional Balance",
    description: "Finding calm and focus when the future feels unpredictable.",
    subMoods: [
      { name: "Anxious", relevance: 5 },
      { name: "Worried", relevance: 4 },
      { name: "Inferior", relevance: 3 },
    ],
  },
  {
    name: "Developing Patience and Presence",
    category: "Mindfulness",
    description: "Learning to pause, breathe, and respond with awareness.",
    subMoods: [
      { name: "Calm", relevance: 5 },
      { name: "Satisfied", relevance: 4 },
      { name: "Perplexed", relevance: 3 }
    ],
  },
  {
    name: "Healing from Rejection",
    category: "Self-Love",
    description: "Understanding emotional wounds and reclaiming self-worth.",
    subMoods: [
      { name: "Hurt", relevance: 5 },
      { name: "Powerless", relevance: 4 },
    ],
  },
  {
    name: "Forgiveness and Letting Go",
    category: "Healing",
    description: "Choosing peace over bitterness to reclaim emotional freedom.",
    subMoods: [
      { name: "Sorrow", relevance: 5 },
      { name: "Regretful", relevance: 4 },
      { name: "Compassionate", relevance: 3 },
      { name: "Hate", relevance: 5 }
    ],
  },
  {
    name: "Cultivating Compassion",
    category: "Empathy",
    description: "Expanding your capacity to care without losing yourself.",
    subMoods: [
      { name: "Tender", relevance: 5 },
      { name: "Compassionate", relevance: 4 },
      { name: "Warmhearted", relevance: 3 },
      { name: "Contempt", relevance: 4 }
    ],
  },
  {
    name: "Embracing Change and Growth",
    category: "Transformation",
    description: "Reframing discomfort as a natural part of evolving.",
    subMoods: [
      { name: "Eager", relevance: 5 },
      { name: "Hopeful", relevance: 4 },
    ],
  },
  {
    name: "Finding Calm Amid Chaos",
    category: "Stress Relief",
    description: "Practices to center yourself during emotional turbulence.",
    subMoods: [
      { name: "Helpless", relevance: 5 },
      { name: "Anxious", relevance: 4 },
      { name: "Frightened", relevance: 3 },
    ],
  },
  {
    name: "Healing from Betrayal",
    category: "Healing",
    description: "Working through broken trust to rediscover openness and safety.",
    subMoods: [
      { name: "Hurt", relevance: 5 },
      { name: "Resentful", relevance: 4 },
      { name: "Regretful", relevance: 3 },
      { name: "Disillusioned", relevance: 4 },
      { name: "Shocked", relevance: 3 },
    ],
  },
  {
    name: "Finding Awe and Wonder",
    category: "Perspective",
    description: "Reawakening childlike curiosity and gratitude for the world around you.",
    subMoods: [
      { name: "Astonished", relevance: 5 },
      { name: "Awe-Struck", relevance: 4 },
      { name: "Touched", relevance: 3 },
      { name: "Astounded", relevance: 5 },
      { name: "Speechless", relevance: 4 },
    ],
  },
  {
    name: "Living Authentically",
    category: "Self-Expression",
    description: "Honoring your truth and expressing it courageously.",
    subMoods: [
      { name: "Enamored", relevance: 5 },
      { name: "Passionate", relevance: 4 },
      { name: "Rapturous", relevance: 3 },
      { name: "Simulated", relevance: 4 }
    ],
  },
  {
    name: "Finding Meaning in Adversity",
    category: "Resilience",
    description: "Transforming pain into purpose and inner strength.",
    subMoods: [
      { name: "Grief", relevance: 5 },
      { name: "Powerless", relevance: 4 },
      { name: "Depressed", relevance: 3 },
      { name: "Nostalgic", relevance: 3 }
    ],
  },
  {
    name: "Reconnecting with Inspiration",
    category: "Creativity",
    description: "Rediscovering your creative spark and sense of purpose.",
    subMoods: [
      { name: "Enchanted", relevance: 5 },
      { name: "Illustrious", relevance: 4 },
      { name: "Zeal", relevance: 3 },
    ],
  },
  {
    name: "Releasing Control",
    category: "Mindfulness",
    description: "Learning to trust life’s flow instead of forcing outcomes.",
    subMoods: [
      { name: "Satisfied", relevance: 5 },
    ],
  },
];



  for (const topic of topics) {
    try {
      const createdTopic = await prisma.topic.upsert({
        where: { name: topic.name },
        update: {
          category: topic.category,
          description: topic.description,
        },
        create: {
          name: topic.name,
          category: topic.category,
          description: topic.description,
        },
      });

      // 2️⃣ Create relations to submoods
      for (const sub of topic.subMoods) {
        const subMood = await prisma.subMood.findUnique({
          where: { name: sub.name },
        });

        if (!subMood) {
          console.warn(`⚠️ Submood '${sub.name}' not found — skipping relation`);
          continue;
        }

        // Create link in SubMoodTopic (avoid duplicates)
        await prisma.subMoodTopic.upsert({
          where: {
            subMoodId_topicId: {
              subMoodId: subMood.id,
              topicId: createdTopic.id,
            },
          },
          update: {
            relevance: sub.relevance,
          },
          create: {
            subMoodId: subMood.id,
            topicId: createdTopic.id,
            relevance: sub.relevance,
          },
        });
      }

      console.log(`✅ Seeded topic: ${topic.name}`);
    } catch (e) {
      console.error(`❌ Error creating topic: ${topic.name}`, e);
    }
  }

  console.log("Topics and SubMoodTopic relations seeded successfully!");
}
