export const prayers = [
  {
    title: "Morning Prayer",
    text: "Lord, as I rise this morning, fill me with Your presence. Guide my steps, guard my heart, and let Your light shine through me today. May everything I do bring glory to Your name. Amen.",
    category: "Morning",
  },
  {
    title: "Prayer for Peace",
    text: "Heavenly Father, in the midst of life's storms, let Your peace that surpasses all understanding guard my heart and mind. Remind me that You are in control, and I can rest in Your arms. Amen.",
    category: "Peace",
  },
  {
    title: "Prayer of Gratitude",
    text: "Father, thank You for the breath in my lungs, for Your mercies new every morning, and for the gift of salvation. You are good, and Your love endures forever. I am grateful. Amen.",
    category: "Gratitude",
  },
  {
    title: "Prayer for Strength",
    text: "Lord, when I am weak, You are strong. Today I lean not on my own understanding but trust in You completely. Renew my strength like the eagles, and let me run this race with perseverance. Amen.",
    category: "Strength",
  },
  {
    title: "Evening Prayer",
    text: "Father, as this day draws to a close, I lay before You all that has happened — the victories and the failures. Forgive where I fell short. Thank You for Your faithfulness. Grant me rest in Your peace tonight. Amen.",
    category: "Evening",
  },
  {
    title: "Prayer for Others",
    text: "Lord Jesus, today I lift up those around me — friends, family, and strangers in need. Touch their lives, bring healing to the broken, hope to the weary, and love to the lonely. Be their refuge and strength. Amen.",
    category: "Intercession",
  },
  {
    title: "Prayer for Guidance",
    text: "Lord, Your word is a lamp to my feet and a light to my path. I seek Your direction for the decisions before me. Speak clearly to my heart, and give me the wisdom to follow where You lead. Amen.",
    category: "Guidance",
  },
];

export const scriptures = [
  {
    verse: "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future.",
    reference: "Jeremiah 29:11",
    theme: "Hope",
    reflection: "God's plans for us are good. Even in uncertainty, we can trust that He is working all things together for our good.",
  },
  {
    verse: "I can do all this through him who gives me strength.",
    reference: "Philippians 4:13",
    theme: "Strength",
    reflection: "Our strength is not our own. When we feel inadequate, we can draw on the limitless power of Christ within us.",
  },
  {
    verse: "The LORD is my shepherd, I lack nothing.",
    reference: "Psalm 23:1",
    theme: "Provision",
    reflection: "As our Shepherd, God provides everything we truly need. We can rest knowing we are cared for and led by the One who knows us completely.",
  },
  {
    verse: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
    reference: "Proverbs 3:5-6",
    theme: "Trust",
    reflection: "Our finite minds cannot grasp the full picture. Surrendering our understanding to God opens the way for His perfect direction in our lives.",
  },
  {
    verse: "Come to me, all you who are weary and burdened, and I will give you rest.",
    reference: "Matthew 11:28",
    theme: "Rest",
    reflection: "Jesus invites the tired and heavy-laden. Whatever you carry today, you don't have to carry it alone. Lay it at His feet.",
  },
  {
    verse: "Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.",
    reference: "Joshua 1:9",
    theme: "Courage",
    reflection: "Courage is not the absence of fear — it's moving forward knowing God walks beside you. You are never alone.",
  },
  {
    verse: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.",
    reference: "Romans 8:28",
    theme: "Providence",
    reflection: "Even painful seasons have purpose. God is weaving every thread — the beautiful and the broken — into a tapestry of His glory and our good.",
  },
];

export function getDailyIndex(total) {
  const now = new Date();
  const dayOfYear = Math.floor(
    (now - new Date(now.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
  );
  return dayOfYear % total;
}
