export const brandLinksKey = "launch1stad.brandLinks";

export type BrandLinks = {
  websiteUrl: string;
  appUrl: string;
  whatsappNumber: string;
  instagramProfile: string;
  facebookPage: string;
  youtubeChannel: string;
  telegramLink: string;
};

export const defaultBrandLinks: BrandLinks = {
  websiteUrl: "",
  appUrl: "",
  whatsappNumber: "",
  instagramProfile: "",
  facebookPage: "",
  youtubeChannel: "",
  telegramLink: ""
};

export function readBrandLinks() {
  try {
    const raw = window.localStorage.getItem(brandLinksKey);
    return raw ? { ...defaultBrandLinks, ...(JSON.parse(raw) as Partial<BrandLinks>) } : defaultBrandLinks;
  } catch {
    return defaultBrandLinks;
  }
}

export function saveBrandLinks(config: BrandLinks) {
  window.localStorage.setItem(brandLinksKey, JSON.stringify(config));
}
