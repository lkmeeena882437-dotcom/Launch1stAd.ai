import { LegalPage } from "@/components/legal/LegalPage";

export default function PrivacyPage() {
  return <LegalPage
    title="Privacy Policy"
    intro="Privacy overview for Launch1stAd.ai users."
    sections={[
      { heading: "Information", body: "The workspace stores account, campaign, destination and support information required for product use." },
      { heading: "Usage", body: "Information supports campaign planning, account access, reporting and support workflows." },
      { heading: "Services", body: "Connected services may include authentication, AI, analytics, billing and advertising tools." },
      { heading: "Control", body: "Users may request updates or removal of workspace information through support." }
    ]}
  />;
}
