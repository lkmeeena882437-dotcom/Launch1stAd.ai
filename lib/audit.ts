export function scoreCampaign(data: { offer: string; audience: string; copy: string; budget: string }) {
  let score = 55;
  const wins: string[] = [];
  const fixes: string[] = [];

  if (data.offer.length > 20) { score += 12; wins.push("Offer clear lag raha hai."); } else { fixes.push("Offer ko clear aur specific banao."); }
  if (data.audience.length > 15) { score += 10; wins.push("Audience defined hai."); } else { fixes.push("Audience me age, city, interest aur buyer intent add karo."); }
  if (data.copy.length > 40) { score += 12; wins.push("Ad copy me enough context hai."); } else { fixes.push("Copy me hook, benefit aur CTA add karo."); }
  if (data.budget.length > 2) { score += 6; wins.push("Budget mentioned hai."); } else { fixes.push("Daily budget set karo, jaise ₹500/day."); }

  return { score: Math.min(score, 95), wins, fixes };
}

export function checkAdPolicy(text: string) {
  const risky = ["guaranteed", "100% result", "instant rich", "cure", "before after", "lose weight fast"];
  const found = risky.filter((word) => text.toLowerCase().includes(word));
  return {
    safe: found.length === 0,
    found,
    advice: found.length === 0 ? "Copy safe lag rahi hai. Fir bhi Meta/Google policy ke hisaab se final check karein." : "Guarantee, health claim ya unrealistic promise ko soft language me convert karein."
  };
}
