import type { CampaignInput } from "@/lib/campaign";

export const categories = [
  "Clothing",
  "Coaching",
  "Clinic",
  "Real Estate",
  "Restaurant",
  "Local Store",
  "Ecommerce",
  "Agency",
  "Salon & Beauty",
  "Gym & Fitness",
  "Jewellery",
  "Mobile & Electronics",
  "Travel & Hotel",
  "Event & Wedding",
  "Interior & Furniture",
  "Auto & Vehicle",
  "Grocery & FMCG",
  "Education Course",
  "B2B Services",
  "Creator / Influencer",
  "Telegram Channel",
  "App / SaaS",
  "Financial Education",
  "Stock Market Learning",
  "Trading Community",
  "Insurance Advisory",
  "Loan & Credit Services",
  "Investment Newsletter",
  "Tax & Accounting",
  "Webinar / Workshop",
  "Lead Generation"
];

export const goals: CampaignInput["goal"][] = ["Sales", "Leads", "WhatsApp", "Traffic", "Views", "App Installs"];
export const languages: CampaignInput["language"][] = ["Hinglish", "Hindi", "English"];
export const promotionTypes: CampaignInput["promotionType"][] = ["Website", "App", "Telegram", "Instagram", "Facebook", "WhatsApp", "YouTube", "Local Store", "Landing Page"];
export const adPlatforms = ["Instagram", "Facebook", "Google Search", "YouTube", "Google Display", "Telegram", "In-app ads"];
export const currencies: CampaignInput["currency"][] = ["INR", "USD"];
export const paymentModels: CampaignInput["paymentModel"][] = ["Auto", "CPM", "CPC", "CPV", "CPL"];
export const genders: CampaignInput["gender"][] = ["All", "Men", "Women"];

export const audiencePresets: Record<string, string[]> = {
  Clothing: ["Fashion buyers", "Online shoppers", "Festive offer seekers", "Repeat buyers", "Instagram engagers"],
  Coaching: ["Course enquiries", "Exam preparation leads", "Demo class seekers", "Parent enquiry segment", "Local education intent"],
  Clinic: ["Appointment enquiries", "Local service searchers", "Health awareness readers", "Returning visitors", "Call-ready enquiries"],
  "Real Estate": ["Site visit enquiries", "Property searchers", "Local investment intent", "Home upgrade seekers", "WhatsApp lead segment"],
  Restaurant: ["Food lovers", "Delivery seekers", "Family dining segment", "Offer seekers", "Local map/search intent"],
  "Local Store": ["Nearby buyers", "Walk-in shoppers", "Offer seekers", "Repeat local customers", "WhatsApp enquiries"],
  Ecommerce: ["Online shoppers", "Cart intent visitors", "Offer seekers", "Retargeting visitors", "Product searchers"],
  Agency: ["Business owners", "Lead generation seekers", "Website enquiry segment", "Social page admins", "Retargeting visitors"],
  "Salon & Beauty": ["Appointment enquiries", "Beauty service seekers", "Offer seekers", "Local repeat customers", "Instagram engagers"],
  "Gym & Fitness": ["Trial pass enquiries", "Fitness goal seekers", "Local membership leads", "Transformation content engagers", "WhatsApp enquiries"],
  Jewellery: ["Occasion buyers", "Premium shoppers", "Wedding buyers", "Catalogue viewers", "Store visit enquiries"],
  "Mobile & Electronics": ["Gadget buyers", "Price comparison searchers", "Offer seekers", "Repair/service enquiries", "Local store visitors"],
  "Travel & Hotel": ["Trip planners", "Hotel searchers", "Weekend offer seekers", "Booking enquiries", "Retargeting visitors"],
  "Event & Wedding": ["Wedding enquiries", "Event planning leads", "Portfolio viewers", "Package seekers", "Call-ready enquiries"],
  "Interior & Furniture": ["Home improvement seekers", "Catalogue viewers", "Renovation enquiries", "Premium buyers", "Local service searchers"],
  "Auto & Vehicle": ["Test drive enquiries", "Vehicle service seekers", "Price comparison searchers", "Local dealership visitors", "WhatsApp enquiries"],
  "Grocery & FMCG": ["Nearby buyers", "Monthly purchase segment", "Offer seekers", "Repeat buyers", "Delivery enquiries"],
  "Education Course": ["Course enquiries", "Skill learners", "Demo class seekers", "Webinar viewers", "Lead form visitors"],
  "B2B Services": ["Business decision makers", "Service comparison searchers", "Quote request leads", "Website visitors", "LinkedIn/social engagers"],
  "Creator / Influencer": ["Content engagers", "Follower lookalike segment", "Video viewers", "Community members", "Retargeting viewers"],
  "Telegram Channel": ["Community join intent", "Social content engagers", "Lookalike audience", "Video viewers", "Retargeting viewers"],
  "App / SaaS": ["App install intent", "Trial users", "Feature searchers", "Website visitors", "In-app ad responders"],
  "Financial Education": ["Finance learners", "Budget planning interest", "Investment education seekers", "Webinar leads", "Newsletter subscribers"],
  "Stock Market Learning": ["Stock market learners", "Trading course enquiries", "Market education viewers", "Webinar registrants", "Finance content engagers"],
  "Trading Community": ["Community join intent", "Market discussion followers", "Telegram audience", "Finance creators audience", "Retargeting viewers"],
  "Insurance Advisory": ["Policy comparison seekers", "Family protection segment", "Local advisory leads", "Form visitors", "Call-ready enquiries"],
  "Loan & Credit Services": ["Loan comparison seekers", "Credit score interest", "Eligibility enquiry segment", "Local finance leads", "Form visitors"],
  "Investment Newsletter": ["Finance newsletter subscribers", "Market update readers", "Long-form content readers", "Email opt-in leads", "Retargeting visitors"],
  "Tax & Accounting": ["Business owners", "ITR filing seekers", "GST support leads", "Accounting service enquiries", "Local professional leads"],
  "Webinar / Workshop": ["Webinar registrations", "Skill learners", "Event reminder audience", "Lookalike attendees", "Retargeting viewers"],
  "Lead Generation": ["High-intent searchers", "Form submit intent", "WhatsApp enquiries", "Website visitors", "Retargeting visitors"],
  Default: ["Relevant local buyers", "High-intent searchers", "Social media engagers", "Website visitors", "WhatsApp enquiries"]
};