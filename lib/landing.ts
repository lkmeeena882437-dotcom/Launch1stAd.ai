export function buildLandingCopy(name: string, offer: string, location: string) {
  const brand = name || "Your business";
  const product = offer || "your offer";
  const place = location || "India";
  return {
    hero: `${brand}: ${product} for customers in ${place}`,
    subhero: "Clear offer, fast response and simple WhatsApp enquiry flow.",
    benefits: ["Clear pricing", "Fast support", "Trust-focused offer", "Easy contact"],
    faq: ["How to order? Send WhatsApp.", "Where available? Check location and delivery.", "What is the price? Ask for latest offer."]
  };
}
