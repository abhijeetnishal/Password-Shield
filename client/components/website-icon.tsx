"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  Mail,
  MessageCircle,
  Music,
  ShoppingCart,
  CreditCard,
  Briefcase,
  Github,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Play,
  Headphones,
  Monitor,
  Smartphone,
  Cloud,
  Code,
  Palette,
  FileText,
  Calendar,
  MapPin,
  Car,
  Plane,
  Home,
  Gamepad2,
  BookOpen,
  GraduationCap,
  Heart,
  Zap,
  Lock,
  Shield,
  Building,
  Utensils,
  Dumbbell,
  PiggyBank,
  TrendingUp,
  Newspaper,
  Radio,
  Tv,
  Edit,
  MessageSquare,
  Users,
  Star,
  Search,
  Archive,
  Download,
  Target,
  Layers,
  Grid,
  Activity,
  Bookmark,
  WifiIcon,
  AtSign,
  Hash,
  DollarSign,
  X,
  ShoppingBag,
  User,
  Camera,
  Video,
} from "lucide-react";

interface WebsiteIconProps {
  website?: string;
  title?: string;
  category?: string;
  className?: string;
}

// Comprehensive modern website mappings with current brand colors and appropriate icons
const WEBSITE_MAPPINGS = {
  // Google Services
  "gmail.com": { icon: Mail, color: "bg-red-500", name: "Gmail" },
  "google.com": { icon: Search, color: "bg-blue-500", name: "Google" },
  "drive.google.com": {
    icon: Cloud,
    color: "bg-blue-500",
    name: "Google Drive",
  },
  "docs.google.com": {
    icon: FileText,
    color: "bg-blue-500",
    name: "Google Docs",
  },
  "sheets.google.com": {
    icon: Grid,
    color: "bg-green-600",
    name: "Google Sheets",
  },
  "slides.google.com": {
    icon: Monitor,
    color: "bg-yellow-500",
    name: "Google Slides",
  },
  "calendar.google.com": {
    icon: Calendar,
    color: "bg-blue-600",
    name: "Google Calendar",
  },
  "photos.google.com": {
    icon: Camera,
    color: "bg-red-500",
    name: "Google Photos",
  },
  "maps.google.com": {
    icon: MapPin,
    color: "bg-green-500",
    name: "Google Maps",
  },
  "youtube.com": { icon: Youtube, color: "bg-red-600", name: "YouTube" },
  "play.google.com": { icon: Play, color: "bg-green-500", name: "Google Play" },

  // Microsoft Services
  "outlook.com": { icon: Mail, color: "bg-blue-600", name: "Outlook" },
  "hotmail.com": { icon: Mail, color: "bg-blue-600", name: "Hotmail" },
  "live.com": { icon: Mail, color: "bg-blue-600", name: "Microsoft Live" },
  "microsoft.com": { icon: Building, color: "bg-blue-600", name: "Microsoft" },
  "office.com": {
    icon: Briefcase,
    color: "bg-blue-600",
    name: "Microsoft Office",
  },
  "onedrive.com": { icon: Cloud, color: "bg-blue-600", name: "OneDrive" },
  "teams.microsoft.com": {
    icon: Users,
    color: "bg-purple-600",
    name: "Microsoft Teams",
  },
  "xbox.com": { icon: Gamepad2, color: "bg-green-600", name: "Xbox" },
  "linkedin.com": { icon: Linkedin, color: "bg-blue-700", name: "LinkedIn" },
  "skype.com": { icon: Video, color: "bg-blue-500", name: "Skype" },

  // Apple Services
  "apple.com": { icon: Smartphone, color: "bg-gray-800", name: "Apple" },
  "icloud.com": { icon: Cloud, color: "bg-blue-500", name: "iCloud" },
  "music.apple.com": { icon: Music, color: "bg-red-500", name: "Apple Music" },
  "tv.apple.com": { icon: Tv, color: "bg-black", name: "Apple TV+" },
  "appstore.com": { icon: Download, color: "bg-blue-500", name: "App Store" },

  // Social Media - Updated
  "facebook.com": { icon: Facebook, color: "bg-blue-600", name: "Facebook" },
  "instagram.com": {
    icon: Instagram,
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
    name: "Instagram",
  },
  "twitter.com": { icon: Twitter, color: "bg-blue-400", name: "Twitter" },
  "x.com": { icon: X, color: "bg-black", name: "X" },
  "tiktok.com": { icon: Music, color: "bg-black", name: "TikTok" },
  "snapchat.com": { icon: Camera, color: "bg-yellow-400", name: "Snapchat" },
  "pinterest.com": { icon: Bookmark, color: "bg-red-600", name: "Pinterest" },
  "reddit.com": { icon: MessageCircle, color: "bg-orange-600", name: "Reddit" },
  "discord.com": {
    icon: MessageSquare,
    color: "bg-indigo-600",
    name: "Discord",
  },
  "telegram.org": {
    icon: MessageCircle,
    color: "bg-blue-400",
    name: "Telegram",
  },
  "whatsapp.com": {
    icon: MessageCircle,
    color: "bg-green-500",
    name: "WhatsApp",
  },
  "signal.org": { icon: MessageCircle, color: "bg-blue-600", name: "Signal" },
  "mastodon.social": { icon: Users, color: "bg-purple-600", name: "Mastodon" },
  "threads.net": { icon: AtSign, color: "bg-black", name: "Threads" },

  // Entertainment & Streaming - Updated
  "netflix.com": { icon: Play, color: "bg-red-600", name: "Netflix" },
  "spotify.com": { icon: Headphones, color: "bg-green-500", name: "Spotify" },
  "twitch.tv": { icon: Video, color: "bg-purple-600", name: "Twitch" },
  "hulu.com": { icon: Play, color: "bg-green-400", name: "Hulu" },
  "disneyplus.com": { icon: Star, color: "bg-blue-600", name: "Disney+" },
  "primevideo.com": { icon: Play, color: "bg-blue-900", name: "Prime Video" },
  "hbomax.com": { icon: Play, color: "bg-purple-700", name: "HBO Max" },
  "paramount.com": { icon: Play, color: "bg-blue-600", name: "Paramount+" },
  "peacocktv.com": { icon: Play, color: "bg-purple-600", name: "Peacock" },
  "crunchyroll.com": {
    icon: Play,
    color: "bg-orange-500",
    name: "Crunchyroll",
  },
  "funimation.com": { icon: Play, color: "bg-purple-600", name: "Funimation" },
  "soundcloud.com": { icon: Music, color: "bg-orange-500", name: "SoundCloud" },
  "pandora.com": { icon: Music, color: "bg-blue-600", name: "Pandora" },
  "tidal.com": { icon: Music, color: "bg-black", name: "Tidal" },

  // Shopping & E-commerce - Updated
  "amazon.com": { icon: ShoppingBag, color: "bg-orange-500", name: "Amazon" },
  "ebay.com": { icon: ShoppingCart, color: "bg-blue-600", name: "eBay" },
  "etsy.com": { icon: Heart, color: "bg-orange-600", name: "Etsy" },
  "shopify.com": { icon: ShoppingBag, color: "bg-green-600", name: "Shopify" },
  "walmart.com": { icon: ShoppingCart, color: "bg-blue-600", name: "Walmart" },
  "target.com": { icon: Target, color: "bg-red-600", name: "Target" },
  "bestbuy.com": { icon: ShoppingBag, color: "bg-blue-600", name: "Best Buy" },
  "costco.com": { icon: ShoppingCart, color: "bg-red-600", name: "Costco" },
  "alibaba.com": { icon: ShoppingBag, color: "bg-orange-500", name: "Alibaba" },
  "aliexpress.com": {
    icon: ShoppingCart,
    color: "bg-red-500",
    name: "AliExpress",
  },
  "wish.com": { icon: Star, color: "bg-blue-500", name: "Wish" },

  // Financial & Banking - Updated
  "paypal.com": { icon: CreditCard, color: "bg-blue-600", name: "PayPal" },
  "stripe.com": { icon: CreditCard, color: "bg-purple-600", name: "Stripe" },
  "venmo.com": { icon: DollarSign, color: "bg-blue-500", name: "Venmo" },
  "cashapp.com": { icon: DollarSign, color: "bg-green-500", name: "Cash App" },
  "zelle.com": { icon: Zap, color: "bg-purple-600", name: "Zelle" },
  "mint.com": { icon: PiggyBank, color: "bg-green-600", name: "Mint" },
  "robinhood.com": {
    icon: TrendingUp,
    color: "bg-green-500",
    name: "Robinhood",
  },
  "coinbase.com": { icon: TrendingUp, color: "bg-blue-600", name: "Coinbase" },
  "binance.com": { icon: TrendingUp, color: "bg-yellow-500", name: "Binance" },
  "chase.com": { icon: Building, color: "bg-blue-800", name: "Chase" },
  "bankofamerica.com": {
    icon: Building,
    color: "bg-red-700",
    name: "Bank of America",
  },
  "wellsfargo.com": {
    icon: Building,
    color: "bg-red-600",
    name: "Wells Fargo",
  },
  "citi.com": { icon: Building, color: "bg-blue-600", name: "Citi" },
  "capitalone.com": {
    icon: Building,
    color: "bg-red-600",
    name: "Capital One",
  },

  // Development & Tech - Updated
  "github.com": { icon: Github, color: "bg-gray-800", name: "GitHub" },
  "gitlab.com": { icon: Code, color: "bg-orange-600", name: "GitLab" },
  "bitbucket.org": { icon: Code, color: "bg-blue-600", name: "Bitbucket" },
  "stackoverflow.com": {
    icon: Code,
    color: "bg-orange-500",
    name: "Stack Overflow",
  },
  "codepen.io": { icon: Code, color: "bg-black", name: "CodePen" },
  "replit.com": { icon: Code, color: "bg-orange-500", name: "Replit" },
  "codesandbox.io": { icon: Code, color: "bg-black", name: "CodeSandbox" },
  "vercel.com": { icon: Zap, color: "bg-black", name: "Vercel" },
  "netlify.com": { icon: Zap, color: "bg-teal-500", name: "Netlify" },
  "heroku.com": { icon: Cloud, color: "bg-purple-600", name: "Heroku" },
  "digitalocean.com": {
    icon: Cloud,
    color: "bg-blue-500",
    name: "DigitalOcean",
  },
  "aws.amazon.com": { icon: Cloud, color: "bg-orange-500", name: "AWS" },

  // Design & Productivity - Updated
  "figma.com": { icon: Palette, color: "bg-purple-600", name: "Figma" },
  "sketch.com": { icon: Palette, color: "bg-orange-500", name: "Sketch" },
  "adobe.com": { icon: Palette, color: "bg-red-600", name: "Adobe" },
  "canva.com": { icon: Palette, color: "bg-blue-500", name: "Canva" },
  "notion.so": { icon: FileText, color: "bg-gray-800", name: "Notion" },
  "obsidian.md": { icon: FileText, color: "bg-purple-600", name: "Obsidian" },
  "evernote.com": { icon: FileText, color: "bg-green-600", name: "Evernote" },
  "onenote.com": { icon: FileText, color: "bg-purple-600", name: "OneNote" },
  "trello.com": { icon: Grid, color: "bg-blue-600", name: "Trello" },
  "asana.com": { icon: Target, color: "bg-pink-600", name: "Asana" },
  "monday.com": { icon: Calendar, color: "bg-purple-600", name: "Monday.com" },
  "clickup.com": { icon: Target, color: "bg-purple-600", name: "ClickUp" },
  "airtable.com": { icon: Grid, color: "bg-yellow-500", name: "Airtable" },

  // Communication & Collaboration - Updated
  "slack.com": { icon: Hash, color: "bg-purple-600", name: "Slack" },
  "zoom.us": { icon: Video, color: "bg-blue-500", name: "Zoom" },
  "meet.google.com": {
    icon: Video,
    color: "bg-green-500",
    name: "Google Meet",
  },
  "webex.com": { icon: Video, color: "bg-green-600", name: "Webex" },
  "gotomeeting.com": {
    icon: Video,
    color: "bg-orange-500",
    name: "GoToMeeting",
  },
  "miro.com": { icon: Layers, color: "bg-yellow-500", name: "Miro" },
  "mural.co": { icon: Layers, color: "bg-red-500", name: "Mural" },

  // Cloud Storage - Updated
  "dropbox.com": { icon: Cloud, color: "bg-blue-600", name: "Dropbox" },
  "box.com": { icon: Archive, color: "bg-blue-600", name: "Box" },
  "mega.nz": { icon: Cloud, color: "bg-red-600", name: "MEGA" },
  "pcloud.com": { icon: Cloud, color: "bg-blue-500", name: "pCloud" },

  // News & Media - Updated
  "medium.com": { icon: Edit, color: "bg-black", name: "Medium" },
  "substack.com": { icon: Newspaper, color: "bg-orange-500", name: "Substack" },
  "nytimes.com": { icon: Newspaper, color: "bg-black", name: "New York Times" },
  "cnn.com": { icon: Tv, color: "bg-red-600", name: "CNN" },
  "bbc.com": { icon: Radio, color: "bg-red-600", name: "BBC" },

  // Travel & Transportation - Updated
  "uber.com": { icon: Car, color: "bg-black", name: "Uber" },
  "lyft.com": { icon: Car, color: "bg-pink-500", name: "Lyft" },
  "airbnb.com": { icon: Home, color: "bg-red-500", name: "Airbnb" },
  "booking.com": { icon: Plane, color: "bg-blue-600", name: "Booking.com" },
  "expedia.com": { icon: Plane, color: "bg-yellow-500", name: "Expedia" },
  "kayak.com": { icon: Plane, color: "bg-orange-500", name: "Kayak" },
  "tripadvisor.com": {
    icon: MapPin,
    color: "bg-green-500",
    name: "TripAdvisor",
  },

  // Food & Delivery - Updated
  "doordash.com": { icon: Utensils, color: "bg-red-500", name: "DoorDash" },
  "ubereats.com": { icon: Utensils, color: "bg-black", name: "Uber Eats" },
  "grubhub.com": { icon: Utensils, color: "bg-orange-500", name: "Grubhub" },
  "postmates.com": { icon: Utensils, color: "bg-black", name: "Postmates" },
  "seamless.com": { icon: Utensils, color: "bg-green-500", name: "Seamless" },
  "yelp.com": { icon: Star, color: "bg-red-600", name: "Yelp" },
  "opentable.com": { icon: Utensils, color: "bg-red-600", name: "OpenTable" },

  // Health & Fitness - Updated
  "myfitnesspal.com": {
    icon: Dumbbell,
    color: "bg-blue-600",
    name: "MyFitnessPal",
  },
  "strava.com": { icon: Activity, color: "bg-orange-500", name: "Strava" },
  "fitbit.com": { icon: Activity, color: "bg-teal-500", name: "Fitbit" },
  "peloton.com": { icon: Dumbbell, color: "bg-black", name: "Peloton" },
  "headspace.com": { icon: Heart, color: "bg-orange-500", name: "Headspace" },
  "calm.com": { icon: Heart, color: "bg-blue-500", name: "Calm" },

  // Education - Updated
  "coursera.org": {
    icon: GraduationCap,
    color: "bg-blue-600",
    name: "Coursera",
  },
  "udemy.com": { icon: BookOpen, color: "bg-purple-600", name: "Udemy" },
  "edx.org": { icon: GraduationCap, color: "bg-blue-600", name: "edX" },
  "khanacademy.org": {
    icon: BookOpen,
    color: "bg-green-600",
    name: "Khan Academy",
  },
  "duolingo.com": { icon: BookOpen, color: "bg-green-500", name: "Duolingo" },
  "skillshare.com": { icon: Palette, color: "bg-blue-500", name: "Skillshare" },

  // Gaming - Updated
  "steam.com": { icon: Gamepad2, color: "bg-blue-900", name: "Steam" },
  "epicgames.com": { icon: Gamepad2, color: "bg-black", name: "Epic Games" },
  "battle.net": { icon: Gamepad2, color: "bg-blue-600", name: "Battle.net" },
  "origin.com": { icon: Gamepad2, color: "bg-orange-500", name: "Origin" },
  "uplay.com": { icon: Gamepad2, color: "bg-blue-600", name: "Uplay" },
  "nintendo.com": { icon: Gamepad2, color: "bg-red-600", name: "Nintendo" },
  "playstation.com": {
    icon: Gamepad2,
    color: "bg-blue-600",
    name: "PlayStation",
  },

  // Email Services - Updated
  "protonmail.com": {
    icon: Shield,
    color: "bg-purple-700",
    name: "ProtonMail",
  },
  "tutanota.com": { icon: Shield, color: "bg-red-600", name: "Tutanota" },
  "fastmail.com": { icon: Mail, color: "bg-blue-600", name: "Fastmail" },
  "zoho.com": { icon: Mail, color: "bg-red-600", name: "Zoho Mail" },
  "yandex.com": { icon: Mail, color: "bg-red-600", name: "Yandex Mail" },

  // VPN & Security - Updated
  "nordvpn.com": { icon: Shield, color: "bg-blue-600", name: "NordVPN" },
  "expressvpn.com": { icon: Shield, color: "bg-red-600", name: "ExpressVPN" },
  "surfshark.com": { icon: Shield, color: "bg-green-500", name: "Surfshark" },
  "1password.com": { icon: Lock, color: "bg-blue-600", name: "1Password" },
  "bitwarden.com": { icon: Lock, color: "bg-blue-600", name: "Bitwarden" },
  "lastpass.com": { icon: Lock, color: "bg-red-600", name: "LastPass" },
  "dashlane.com": { icon: Lock, color: "bg-green-500", name: "Dashlane" },
};

// Enhanced category fallback icons with modern styling
const CATEGORY_ICONS = {
  social: {
    icon: Users,
    color: "bg-gradient-to-r from-blue-500 to-purple-600",
  },
  banking: {
    icon: PiggyBank,
    color: "bg-gradient-to-r from-green-500 to-emerald-600",
  },
  work: {
    icon: Briefcase,
    color: "bg-gradient-to-r from-blue-600 to-indigo-700",
  },
  personal: { icon: User, color: "bg-gradient-to-r from-gray-600 to-gray-700" },
  wifi: {
    icon: WifiIcon,
    color: "bg-gradient-to-r from-purple-500 to-pink-600",
  },
  entertainment: {
    icon: Play,
    color: "bg-gradient-to-r from-red-500 to-pink-600",
  },
  shopping: {
    icon: ShoppingBag,
    color: "bg-gradient-to-r from-orange-500 to-red-600",
  },
  education: {
    icon: GraduationCap,
    color: "bg-gradient-to-r from-blue-500 to-teal-600",
  },
  health: { icon: Heart, color: "bg-gradient-to-r from-pink-500 to-red-600" },
  travel: { icon: Plane, color: "bg-gradient-to-r from-blue-500 to-cyan-600" },
  food: {
    icon: Utensils,
    color: "bg-gradient-to-r from-orange-500 to-yellow-600",
  },
  gaming: {
    icon: Gamepad2,
    color: "bg-gradient-to-r from-purple-600 to-blue-700",
  },
  other: { icon: Lock, color: "bg-gradient-to-r from-gray-500 to-slate-600" },
};

export function WebsiteIcon({
  website,
  title,
  category,
  className,
}: WebsiteIconProps) {
  const [faviconUrl, setFaviconUrl] = useState<string | null>(null);
  const [faviconError, setFaviconError] = useState(false);

  // Extract domain from website URL
  const getDomain = (url: string): string => {
    try {
      const domain = new URL(url.startsWith("http") ? url : `https://${url}`)
        .hostname;
      return domain.replace("www.", "").toLowerCase();
    } catch {
      return url.toLowerCase().replace("www.", "");
    }
  };

  // Get website mapping based on domain or title
  const getWebsiteMapping = () => {
    if (website) {
      const domain = getDomain(website);
      if (WEBSITE_MAPPINGS[domain as keyof typeof WEBSITE_MAPPINGS]) {
        return WEBSITE_MAPPINGS[domain as keyof typeof WEBSITE_MAPPINGS];
      }

      // Try partial matches for subdomains
      for (const [mappedDomain, mapping] of Object.entries(WEBSITE_MAPPINGS)) {
        if (
          domain.includes(mappedDomain) ||
          mappedDomain.includes(domain.split(".")[0])
        ) {
          return mapping;
        }
      }
    }

    // Try to match by title
    if (title) {
      const titleLower = title.toLowerCase();
      for (const [domain, mapping] of Object.entries(WEBSITE_MAPPINGS)) {
        if (
          titleLower.includes(mapping.name.toLowerCase()) ||
          titleLower.includes(domain.split(".")[0]) ||
          mapping.name.toLowerCase().includes(titleLower)
        ) {
          return mapping;
        }
      }
    }

    return null;
  };

  // Get high-quality favicon URL
  const getFaviconUrl = (domain: string): string => {
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  };

  useEffect(() => {
    if (website && !getWebsiteMapping()) {
      const domain = getDomain(website);
      const favicon = getFaviconUrl(domain);
      setFaviconUrl(favicon);
      setFaviconError(false);
    }
  }, [website]);

  const websiteMapping = getWebsiteMapping();
  const categoryFallback =
    CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS] ||
    CATEGORY_ICONS.other;

  // If we have a specific website mapping, use it
  if (websiteMapping) {
    const Icon = websiteMapping.icon;
    return (
      <div
        className={cn(
          "rounded-xl flex items-center justify-center shadow-sm border border-white/20",
          websiteMapping.color,
          className
        )}
      >
        <Icon className="h-1/2 w-1/2 text-white drop-shadow-sm" />
      </div>
    );
  }

  // If we have a favicon and it hasn't errored, use it
  if (faviconUrl && !faviconError) {
    return (
      <div
        className={cn(
          "rounded-xl overflow-hidden bg-white border border-gray-200 shadow-sm",
          className
        )}
      >
        <img
          src={faviconUrl || "/placeholder.svg"}
          alt={`${title || website} icon`}
          className="w-full h-full object-cover"
          onError={() => setFaviconError(true)}
          onLoad={() => setFaviconError(false)}
        />
      </div>
    );
  }

  // Fallback to category icon with modern gradient
  const FallbackIcon = categoryFallback.icon;
  return (
    <div
      className={cn(
        "rounded-xl flex items-center justify-center shadow-sm border border-white/20",
        categoryFallback.color,
        className
      )}
    >
      <FallbackIcon className="h-1/2 w-1/2 text-white drop-shadow-sm" />
    </div>
  );
}
