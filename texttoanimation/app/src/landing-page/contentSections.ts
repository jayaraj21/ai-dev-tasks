import daBoiAvatar from '../client/static/da-boi.webp';
import kivo from '../client/static/examples/kivo.webp';
import messync from '../client/static/examples/messync.webp';
import microinfluencerClub from '../client/static/examples/microinfluencers.webp';
import promptpanda from '../client/static/examples/promptpanda.webp';
import reviewradar from '../client/static/examples/reviewradar.webp';
import scribeist from '../client/static/examples/scribeist.webp';
import searchcraft from '../client/static/examples/searchcraft.webp';
import { BlogUrl, DocsUrl } from '../shared/common';
import type { GridFeature } from './components/FeaturesGrid';

export const features: GridFeature[] = [
  {
    name: 'Lightning Fast',
    description: 'Generate professional videos in under 60 seconds. No waiting, no rendering queues.',
    emoji: '⚡',
    href: DocsUrl,
    size: 'large',
  },
  {
    name: 'No Design Skills',
    description: 'Simple form-based input. Just describe your product and let AI do the creative work.',
    emoji: '🎨',
    href: DocsUrl,
    size: 'small',
  },
  {
    name: '4 Variations',
    description: 'Get 4 unique video styles per generation. Pick the perfect fit for your brand.',
    emoji: '🎬',
    href: DocsUrl,
    size: 'small',
  },
  {
    name: 'All Platforms',
    description: 'Optimized for Instagram, TikTok, Facebook, YouTube, and LinkedIn. All formats included.',
    emoji: '📱',
    href: DocsUrl,
    size: 'medium',
  },
  {
    name: 'Brand Learning',
    description: 'AI learns your brand style and improves with every video you create.',
    emoji: '🧠',
    href: DocsUrl,
    size: 'medium',
  },
  {
    name: 'Simple Editor',
    description: 'Customize colors, fonts, and music. No complex timeline editing required.',
    emoji: '✏️',
    href: DocsUrl,
    size: 'small',
  },
  {
    name: 'Music Library',
    description: '100+ royalty-free tracks. Auto-matched to your video style and occasion.',
    emoji: '🎵',
    href: DocsUrl,
    size: 'small',
  },
  {
    name: 'HD Quality',
    description: 'Download in 1080p or 4K. No watermarks, no branding. Truly yours.',
    emoji: '💎',
    href: DocsUrl,
    size: 'large',
  },
  {
    name: 'Lifetime Access',
    description: 'Pay once, create forever. No subscriptions, no hidden fees.',
    emoji: '🔓',
    href: DocsUrl,
    size: 'medium',
  },
];

export const testimonials = [
  {
    name: 'Da Boi',
    role: 'Wasp Mascot',
    avatarSrc: daBoiAvatar,
    socialUrl: 'https://twitter.com/wasplang',
    quote: "I don't even know how to code. I'm just a plushie.",
  },
  {
    name: 'Mr. Foobar',
    role: 'Founder @ Cool Startup',
    avatarSrc: daBoiAvatar,
    socialUrl: '',
    quote: 'This product makes me cooler than I already am.',
  },
  {
    name: 'Jamie',
    role: 'Happy Customer',
    avatarSrc: daBoiAvatar,
    socialUrl: '#',
    quote: 'My cats love it!',
  },
];

export const faqs = [
  {
    id: 1,
    question: 'How long does it take to generate a video?',
    answer: 'Most videos are generated in under 60 seconds. You get 4 variations instantly to choose from.',
    href: '#',
  },
  {
    id: 2,
    question: 'Do I need design or video editing skills?',
    answer: 'Not at all! Simply fill out a form with your product details, upload your logo and images, and let AI create professional videos for you.',
    href: '#',
  },
  {
    id: 3,
    question: 'What video formats do you support?',
    answer: 'We support all major social media formats: Instagram Post (1:1), Instagram Reels/Stories (9:16), YouTube (16:9), TikTok (9:16), and Facebook (16:9).',
    href: '#',
  },
  {
    id: 4,
    question: 'Can I use my own music?',
    answer: 'Yes! You can upload custom music or choose from our library of 100+ royalty-free tracks auto-matched to your video style.',
    href: '#',
  },
  {
    id: 5,
    question: 'What if I don\'t like the generated videos?',
    answer: 'You get 4 different style variations per generation. If none fit, you can regenerate with different inputs using your credits. We also offer a 30-day money-back guarantee.',
    href: '#',
  },
  {
    id: 6,
    question: 'How do credits work?',
    answer: '1 credit = 15 seconds of video. A 15-second video costs 1 credit, a 30-second video costs 2 credits. Tier 1 gets 30 credits/month, Tier 2 gets 100 credits/month.',
    href: '#',
  },
  {
    id: 7,
    question: 'Do the videos have watermarks?',
    answer: 'No! All downloaded videos are completely watermark-free and yours to use however you want.',
    href: '#',
  },
  {
    id: 8,
    question: 'Can I create videos for multiple brands?',
    answer: 'Tier 1 supports 1 brand profile. Tier 2 supports unlimited brand profiles and up to 5 team members.',
    href: '#',
  },
];

export const footerNavigation = {
  app: [
    { name: 'Documentation', href: DocsUrl },
    { name: 'Blog', href: BlogUrl },
  ],
  company: [
    { name: 'About', href: 'https://wasp.sh' },
    { name: 'Privacy', href: '#' },
    { name: 'Terms of Service', href: '#' },
  ],
};

export const examples = [
  {
    name: 'Example #1',
    description: 'Describe your example here.',
    imageSrc: kivo,
    href: '#',
  },
  {
    name: 'Example #2',
    description: 'Describe your example here.',
    imageSrc: messync,
    href: '#',
  },
  {
    name: 'Example #3',
    description: 'Describe your example here.',
    imageSrc: microinfluencerClub,
    href: '#',
  },
  {
    name: 'Example #4',
    description: 'Describe your example here.',
    imageSrc: promptpanda,
    href: '#',
  },
  {
    name: 'Example #5',
    description: 'Describe your example here.',
    imageSrc: reviewradar,
    href: '#',
  },
  {
    name: 'Example #6',
    description: 'Describe your example here.',
    imageSrc: scribeist,
    href: '#',
  },
  {
    name: 'Example #7',
    description: 'Describe your example here.',
    imageSrc: searchcraft,
    href: '#',
  },
];
