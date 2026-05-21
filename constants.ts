export const HOTEL_NAME = "Aura web service";
export const HOTEL_NAME_SHORT = "Aura";
export const LOCATION = "Bole, Addis Ababa";
export const ADDRESS = "Bole, Addis Ababa, Ethiopia";

export const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.873425499056!2d38.79373147399562!3d8.983793189697034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b858fbf50bd97%3A0x93a0799b20ab0276!2sBole%20Addis%20Ababa%20International%20Airport!5e0!3m2!1sen!2set!4v1779352042200!5m2!1sen!2set";
/** Real inbox for mailto: links */
export const EMAIL = "frezer.antenhe.dev@gmail.com";
/** Shown in the UI */
export const EMAIL_DISPLAY = "aura-web-service@gmail.com";
export const PHONE = "+251 900030836";
/** Use for tel: links (no spaces) */
export const PHONE_TEL = "tel:+251900030836";
export const EMAIL_MAILTO = `mailto:${EMAIL}`;

/** Formspree contact form endpoint */
export const FORMSPREE_URL = "https://formspree.io/f/xojbdaje";

export type SocialPlatform =
  | 'tiktok'
  | 'youtube'
  | 'telegram'
  | 'instagram'
  | 'facebook'
  | 'twitter'
  | 'linkedin'
  | 'email';

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}

/** Official platform homepages — opens each service when clicked */
export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'tiktok', label: 'TikTok', href: 'https://www.tiktok.com' },
  { platform: 'youtube', label: 'YouTube', href: 'https://www.youtube.com' },
  { platform: 'telegram', label: 'Telegram', href: 'https://telegram.org' },
  { platform: 'instagram', label: 'Instagram', href: 'https://www.instagram.com' },
  { platform: 'facebook', label: 'Facebook', href: 'https://www.facebook.com' },
  { platform: 'twitter', label: 'X (Twitter)', href: 'https://x.com' },
  { platform: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com' },
  { platform: 'email', label: EMAIL_DISPLAY, href: EMAIL_MAILTO },
];

export const IMAGES = {
  hero: "https://images.trvl-media.com/lodging/119000000/118780000/118776200/118776163/3b2b1b5a.jpg?impolicy=resizecrop&rw=1200&ra=fit",
  rooms: [
    "https://images.trvl-media.com/lodging/119000000/118780000/118776200/118776163/7f8f5df2.jpg?impolicy=resizecrop&rw=1200&ra=fit",
    "https://images.trvl-media.com/lodging/119000000/118780000/118776200/118776163/5c3bd3f8.jpg?impolicy=resizecrop&rw=1200&ra=fit",
    "https://images.trvl-media.com/lodging/119000000/118780000/118776200/118776163/7a1881ba.jpg?impolicy=resizecrop&rw=1200&ra=fit",
    "https://images.trvl-media.com/lodging/119000000/118780000/118776200/118776163/b1fe5dd5.jpg?impolicy=resizecrop&rw=1200&ra=fit",
    "https://images.trvl-media.com/lodging/119000000/118780000/118776200/118776163/9a958a41.jpg?impolicy=resizecrop&rw=1200&ra=fit",
    "https://images.trvl-media.com/lodging/119000000/118780000/118776200/118776163/6aed5eda.jpg?impolicy=resizecrop&rw=1200&ra=fit" // Twin
  ],
  dining: [
    "https://images.trvl-media.com/lodging/119000000/118780000/118776200/118776163/43ba63d2.jpg?impolicy=resizecrop&rw=1200&ra=fit",
    "https://images.trvl-media.com/lodging/119000000/118780000/118776200/118776163/1aae461b.jpg?impolicy=resizecrop&rw=1200&ra=fit",
    "https://images.trvl-media.com/lodging/119000000/118780000/118776200/118776163/6f5d3efb.jpg?impolicy=resizecrop&rw=1200&ra=fit",
    "https://images.trvl-media.com/lodging/119000000/118780000/118776200/118776163/03b5bbe0.jpg?impolicy=resizecrop&rw=1200&ra=fit",
    "https://images.trvl-media.com/lodging/119000000/118780000/118776200/118776163/82a0f26c.jpg?impolicy=resizecrop&rw=1200&ra=fit"
  ]
};

export const NAVIGATION = [
  { name: 'Home', href: '/' },
  { name: 'Rooms', href: '/rooms' },
  { name: 'Dining', href: '/dining' },
  { name: 'Location', href: '/location' },
];