import { 
  IconCrown, 
  IconSpiral, 
  IconMoodSmile, 
  IconChartBar, 
  IconDeviceGamepad, 
  IconCpu,
  IconFlame
} from "@tabler/icons-react";

export const MEME_CATEGORIES = [
  {
    id: "trending",
    label: "Trending",
    emoji: "🔥",
    icon: <IconFlame className="h-5 w-5" />,
    color: "#39FF14", // Your Slime Green tweak
    description: "What's pumping right now."
  },
  {
    id: "blue-chips",
    label: "Blue Chips",
    emoji: "🏛️",
    icon: <IconCrown className="h-5 w-5" />,
    color: "#BFB1C1", // Your HEHE Lavender
    description: "The immortal legends."
  },
  {
    id: "brain-rot",
    label: "Brain Rot",
    emoji: "🌀",
    icon: <IconSpiral className="h-5 w-5" />,
    color: "#39FF14",
    description: "Pure internet chaos."
  },
  {
    id: "reaction",
    label: "Reaction",
    emoji: "🎭",
    icon: <IconMoodSmile className="h-5 w-5" />,
    color: "#C7DBE6", // Your HEHE Light Blue
    description: "Relatable daily vibes."
  },
  {
    id: "politics-ceo",
    label: "Satires",
    emoji: "💼",
    icon: <IconChartBar className="h-5 w-5" />,
    color: "#364652", // Your HEHE Slate
    description: "Billionaires and world news."
  },
  {
    id: "gaming",
    label: "Gaming",
    emoji: "🎮",
    icon: <IconDeviceGamepad className="h-5 w-5" />,
    color: "#00F5FF", // Cyan Tweak
    description: "For the sweaty try-hards."
  },
  {
    id: "ai-gen",
    label: "AI Cursed",
    emoji: "🤖",
    icon: <IconCpu className="h-5 w-5" />,
    color: "#FF007F", // Pink Tweak
    description: "Hallucinations and deepfakes."
  },
];