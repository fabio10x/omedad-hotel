import React from 'react';
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Mail,
  Send,
  Music2,
  Linkedin,
} from 'lucide-react';
import { SOCIAL_LINKS, type SocialPlatform } from '../constants';

const iconClass = 'w-5 h-5';

const platformIcons: Record<SocialPlatform, React.ReactNode> = {
  tiktok: <Music2 className={iconClass} aria-hidden />,
  youtube: <Youtube className={iconClass} aria-hidden />,
  telegram: <Send className={iconClass} aria-hidden />,
  instagram: <Instagram className={iconClass} aria-hidden />,
  facebook: <Facebook className={iconClass} aria-hidden />,
  twitter: <Twitter className={iconClass} aria-hidden />,
  linkedin: <Linkedin className={iconClass} aria-hidden />,
  email: <Mail className={iconClass} aria-hidden />,
};

interface SocialLinksProps {
  variant?: 'icons' | 'list';
  className?: string;
  iconClassName?: string;
}

const SocialLinks: React.FC<SocialLinksProps> = ({
  variant = 'icons',
  className = '',
  iconClassName = 'hover:text-gold-500 transition-colors',
}) => {
  if (variant === 'list') {
    return (
      <ul className={`space-y-3 ${className}`}>
        {SOCIAL_LINKS.map(({ platform, label, href }) => (
          <li key={platform}>
            <a
              href={href}
              target={platform === 'email' ? undefined : '_blank'}
              rel={platform === 'email' ? undefined : 'noopener noreferrer'}
              className="flex items-center gap-3 text-stone-600 hover:text-gold-600 transition-colors"
            >
              <span className="text-gold-600">{platformIcons[platform]}</span>
              <span className="font-medium">{label}</span>
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      {SOCIAL_LINKS.map(({ platform, label, href }) => (
        <a
          key={platform}
          href={href}
          target={platform === 'email' ? undefined : '_blank'}
          rel={platform === 'email' ? undefined : 'noopener noreferrer'}
          aria-label={label}
          title={label}
          className={iconClassName}
        >
          {platformIcons[platform]}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
