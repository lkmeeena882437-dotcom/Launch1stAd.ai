import { LegalPage } from "@/components/legal/LegalPage";

export default function TermsPage() {
  return <LegalPage
    title="Terms & Conditions"
    intro="Terms for using Launch1stAd.ai workspace."
    sections={[
      { heading: "Workspace use", body: "Users manage their own campaign, wallet and destination information." },
      { heading: "Review process", body: "Submitted campaigns enter review before activation." },
      { heading: "AI support", body: "AI output supports planning and should be reviewed before use." },
      { heading: "Platform rules", body: "Advertisers follow the rules of connected ad platforms and destinations." }
    ]}
  />;
}
