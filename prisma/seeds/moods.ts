import { PrismaClient } from "@prisma/client";

export async function seedMoods(prisma: PrismaClient) {

  const moods = [
    {
      name: "Joy",
      icon: "😊",
      description: "A feeling of great pleasure and happiness.",
      subMoods: [
        { category: "Enthralled", name: "Rapture", description: "Overwhelmed by intense joy and delight." },
        { category: "Enthralled", name: "Enchanted", description: "Completely charmed and captivated by a moment or person." },
        { category: "Elation", name: "Jubilation", description: "Pure, exuberant celebration and triumph." },
        { category: "Elation", name: "Euphoric", description: "A surge of intense happiness and excitement." },
        { category: "Enthusiastic", name: "Zeal", description: "Energetic and passionate drive toward something meaningful." },
        { category: "Enthusiastic", name: "Excited", description: "Full of eager anticipation and high spirits." },
        { category: "Optimistic", name: "Hopeful", description: "Feeling confident that things will turn out well." },
        { category: "Optimistic", name: "Eager", description: "Keen and ready to take on what’s next." },
        { category: "Proud", name: "Illustrious", description: "Feeling distinguished and honored by one’s achievements." },
        { category: "Proud", name: "Triumphant", description: "Basking in the success of hard work and perseverance." },
        { category: "Cheerful", name: "Blissful", description: "Completely content and at peace with the moment." },
        { category: "Cheerful", name: "Joyful", description: "Radiating light-hearted happiness and positivity." },
        { category: "Happy", name: "Delighted", description: "Filled with simple, genuine happiness and satisfaction." },
        { category: "Happy", name: "Amused", description: "Finding lighthearted humor and fun in small things." },
        { category: "Content", name: "Satisfied", description: "Feeling fulfilled and at ease with what is." },
        { category: "Content", name: "Pleased", description: "Comfortably happy with a situation or outcome." },
      ],
    },
    {
      name: "Sadness",
      icon: "😔",
      description: "A state of unhappiness or sorrow.",
      subMoods: [
        { category: "Suffering", name: "Angry", description: "Feeling hurt and resentful due to pain or loss." },
        { category: "Suffering", name: "Hurt", description: "Emotionally wounded and longing for comfort." },
        { category: "Sadness", name: "Depressed", description: "Overwhelmed by prolonged sadness and low energy." },
        { category: "Sadness", name: "Sorrow", description: "Deep grief or heartbreak over something meaningful." },
        { category: "Disappointed", name: "Dismayed", description: "Let down by unmet hopes or expectations." },
        { category: "Disappointed", name: "Displeased", description: "Mildly unhappy with a result or experience." },
        { category: "Shameful", name: "Regretful", description: "Wishing something had gone differently or been done better." },
        { category: "Shameful", name: "Guilty", description: "Burdened by responsibility or remorse for one’s actions." },
        { category: "Neglected", name: "Isolated", description: "Feeling cut off or unseen by others." },
        { category: "Neglected", name: "Lonely", description: "Missing connection and companionship." },
        { category: "Despair", name: "Grief", description: "Deep emotional pain caused by profound loss." },
        { category: "Despair", name: "Powerless", description: "Feeling unable to change or control what’s happening." },
      ],
    },
    {
      name: "Anger",
      icon: "😠",
      description: "A strong feeling of displeasure or hostility.",
      subMoods: [
        { category: "Rage", name: "Hate", description: "Intense aversion and hostility toward something or someone." },
        { category: "Rage", name: "Hostile", description: "Feeling combative or ready to confront others." },
        { category: "Exasperated", name: "Agitated", description: "Restless irritation and emotional unease." },
        { category: "Exasperated", name: "Frustrated", description: "Annoyed due to repeated obstacles or setbacks." },
        { category: "Irritable", name: "Annoyed", description: "Easily bothered or triggered by small things." },
        { category: "Irritable", name: "Aggravated", description: "Increasingly irritated and ready to snap." },
        { category: "Envy", name: "Resentful", description: "Harboring bitterness over perceived unfairness." },
        { category: "Envy", name: "Jealous", description: "Wishing for what others have or fearing to lose what’s yours." },
        { category: "Disgust", name: "Contempt", description: "Looking down on something you consider beneath your values." },
        { category: "Disgust", name: "Revolted", description: "Repelled by something morally or emotionally unpleasant." },
      ],
    },
    {
      name: "Fear",
      icon: "😨",
      description: "An unpleasant emotion caused by threat, danger, or pain.",
      subMoods: [
        { category: "Scared", name: "Frightened", description: "Startled by immediate or imagined danger." },
        { category: "Scared", name: "Helpless", description: "Feeling unable to protect or defend oneself." },
        { category: "Terrified", name: "Panicked", description: "Overwhelmed by sudden intense fear or alarm." },
        { category: "Terrified", name: "Hysterical", description: "Losing control due to overwhelming fright or anxiety." },
        { category: "Insecure", name: "Inferior", description: "Feeling less capable or worthy than others." },
        { category: "Insecure", name: "Inadequate", description: "Doubting one’s own strength or competence." },
        { category: "Nervous", name: "Worried", description: "Uneasy about what might go wrong." },
        { category: "Nervous", name: "Anxious", description: "Tense and overthinking uncertain outcomes." },
        { category: "Horrified", name: "Mortified", description: "Deeply shocked or ashamed by a situation." },
        { category: "Horrified", name: "Dreadful", description: "Gripped by a strong sense of impending doom." },
      ],
    },
    {
      name: "Love",
      icon: "❤️",
      description: "A deep feeling of affection and care for someone or something.",
      subMoods: [
        { category: "Grateful", name: "Thankful", description: "Feeling genuine appreciation for what you have or who’s with you." },
        { category: "Grateful", name: "Appreciative", description: "Recognizing the value and kindness around you." },
        { category: "Sentimental", name: "Nostalgic", description: "Fondly recalling meaningful moments from the past." },
        { category: "Sentimental", name: "Tender", description: "Soft-hearted and gently affectionate." },
        { category: "Affectionate", name: "Compassionate", description: "Caring deeply and empathizing with others’ feelings." },
        { category: "Affectionate", name: "Warmhearted", description: "Radiating kindness and emotional warmth." },
        { category: "Romantic", name: "Enamored", description: "Completely captivated by feelings of love or attraction." },
        { category: "Romantic", name: "Passionate", description: "Full of deep emotional intensity and desire." },
        { category: "Enchanted", name: "Rapturous", description: "Lost in the beauty or magic of love itself." },
        { category: "Enchanted", name: "Enthralled", description: "Completely fascinated and drawn to someone or something." },
      ],
    },
    {
      name: "Surprise",
      icon: "😯",
      description: "A sudden feeling of astonishment or wonder.",
      subMoods: [
        { category: "Stunned", name: "Shocked", description: "Taken aback by something completely unexpected." },
        { category: "Stunned", name: "Bewildered", description: "Confused and unsure how to react to a surprise." },
        { category: "Confused", name: "Disillusioned", description: "Disoriented after realizing something isn’t as it seemed." },
        { category: "Confused", name: "Perplexed", description: "Puzzled and uncertain about a sudden event or change." },
        { category: "Amazed", name: "Astonished", description: "Filled with awe and wonder at something impressive." },
        { category: "Amazed", name: "Awe-Struck", description: "Completely overwhelmed by admiration or wonder." },
        { category: "Overcome", name: "Speechless", description: "Too surprised or moved to find the right words." },
        { category: "Overcome", name: "Astounded", description: "Incredibly impressed by the unexpected." },
        { category: "Moved", name: "Simulated", description: "Emotionally stirred and caught off guard." },
        { category: "Moved", name: "Touched", description: "Deeply affected by a surprising act of kindness or meaning." },
      ],
    }
  ];


  for (const mood of moods) {

    try {
      await prisma.mood.upsert({
        where: { name: mood.name },
        update: {},
        create: {
          name: mood.name,
          icon: mood.icon || null,
          description: mood.description || null,
          subMoods: {
            create: mood.subMoods.map((s) => ({
              name: s.name,
              category: s.category || null,
              description: s.description || null,
            })),
          },
        },
      });
    } catch (e) {
      console.error("Error creating mood:", mood.name, e);
    }
    
  }

  console.log("Moods and submoods seeded successfully!");
}
