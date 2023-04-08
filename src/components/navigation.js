import {
  HomeIcon,
  CalendarIcon,
  PuzzlePieceIcon,
  PlusCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

const navigation = [
  { name: "Dashboard", href: "/app/dashboard", icon: HomeIcon },
  { name: "Daily Puzzle", href: "/app/daily-puzzle", icon: CalendarIcon },
  {
    name: "Puzzles Library",
    href: "/app/puzzle-library",
    icon: PuzzlePieceIcon,
  },
  { name: "Create Puzzle", href: "/app/create-puzzle", icon: PlusCircleIcon },
  { name: "About", href: "/about", icon: InformationCircleIcon },
];

export default navigation;
