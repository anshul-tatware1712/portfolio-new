"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import {
  CodeIcon,
  SmartphoneIcon,
  PaletteIcon,
  WrenchIcon,
  BrainCircuitIcon,
  PackageIcon,
  LayoutIcon,
  MonitorSmartphoneIcon,
  FigmaIcon,
  GitBranchIcon,
  ServerIcon,
  LayersIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

// Category icons mapping
const categoryIcons: Record<string, React.ReactNode> = {
  "Frontend Development": <LayoutIcon className="h-5 w-5 text-primary" />,
  "Mobile Development": <SmartphoneIcon className="h-5 w-5 text-primary" />,
  "UI/UX & Design": <PaletteIcon className="h-5 w-5 text-primary" />,
  "Development Tools": <WrenchIcon className="h-5 w-5 text-primary" />,
  "AI & Backend (Learning)": (
    <BrainCircuitIcon className="h-5 w-5 text-primary" />
  ),
  "Libraries & More": <PackageIcon className="h-5 w-5 text-primary" />,
};

// Skill icon function with updated mapping
const getSkillIcon = (skill: string): React.ReactNode => {
  const lowerSkill = skill.toLowerCase();

  // Frontend
  if (lowerSkill.includes("react") || lowerSkill.includes("next"))
    return <CodeIcon className="h-3.5 w-3.5" />;
  if (lowerSkill.includes("typescript") || lowerSkill.includes("javascript"))
    return <CodeIcon className="h-3.5 w-3.5" />;
  if (lowerSkill.includes("html") || lowerSkill.includes("css"))
    return <LayoutIcon className="h-3.5 w-3.5" />;
  if (lowerSkill.includes("tailwind") || lowerSkill.includes("framer"))
    return <PaletteIcon className="h-3.5 w-3.5" />;

  // Mobile
  if (
    lowerSkill.includes("native") ||
    lowerSkill.includes("expo") ||
    lowerSkill.includes("mobile")
  )
    return <SmartphoneIcon className="h-3.5 w-3.5" />;

  // Design
  if (
    lowerSkill.includes("figma") ||
    lowerSkill.includes("ui/ux") ||
    lowerSkill.includes("design")
  )
    return <PaletteIcon className="h-3.5 w-3.5" />;
  if (
    lowerSkill.includes("responsive") ||
    lowerSkill.includes("wireframe") ||
    lowerSkill.includes("prototype")
  )
    return <MonitorSmartphoneIcon className="h-3.5 w-3.5" />;

  // Tools
  if (lowerSkill.includes("git") || lowerSkill.includes("github"))
    return <GitBranchIcon className="h-3.5 w-3.5" />;
  if (
    lowerSkill.includes("vite") ||
    lowerSkill.includes("webpack") ||
    lowerSkill.includes("npm") ||
    lowerSkill.includes("yarn")
  )
    return <WrenchIcon className="h-3.5 w-3.5" />;
  if (lowerSkill.includes("postman") || lowerSkill.includes("vs code"))
    return <WrenchIcon className="h-3.5 w-3.5" />;

  // Backend/AI
  if (lowerSkill.includes("node") || lowerSkill.includes("express"))
    return <ServerIcon className="h-3.5 w-3.5" />;
  if (lowerSkill.includes("api") || lowerSkill.includes("chatgpt"))
    return <BrainCircuitIcon className="h-3.5 w-3.5" />;
  if (lowerSkill.includes("python") || lowerSkill.includes("machine learning"))
    return <BrainCircuitIcon className="h-3.5 w-3.5" />;

  // Libraries
  if (
    lowerSkill.includes("redux") ||
    lowerSkill.includes("zustand") ||
    lowerSkill.includes("query")
  )
    return <LayersIcon className="h-3.5 w-3.5" />;
  if (
    lowerSkill.includes("storybook") ||
    lowerSkill.includes("jest") ||
    lowerSkill.includes("cypress")
  )
    return <PackageIcon className="h-3.5 w-3.5" />;
  if (lowerSkill.includes("prisma") || lowerSkill.includes("socket"))
    return <ServerIcon className="h-3.5 w-3.5" />;

  return <PackageIcon className="h-3.5 w-3.5" />;
};

interface SkillCategoryProps {
  name: string;
  skills: readonly string[];
  icon?: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
  count: number;
}

const SkillCategory: React.FC<SkillCategoryProps> = ({
  name,
  skills,
  icon,
  isActive,
  onClick,
  count,
}) => (
  <div
    onClick={onClick}
    className={cn(
      "flex cursor-pointer flex-col items-center gap-1 p-3 transition-all duration-200",
      isActive
        ? "rounded-xl bg-primary text-white shadow-md"
        : "rounded-lg bg-muted hover:bg-muted/80",
    )}
  >
    <div className="flex items-center gap-2">{icon && icon}</div>
    <span className="text-sm font-medium">{name}</span>
    <span
      className={cn(
        "flex h-5 w-5 items-center justify-center rounded-full text-xs font-semibold",
        isActive
          ? "bg-white text-primary"
          : "bg-background text-muted-foreground",
      )}
    >
      {count}
    </span>
  </div>
);

interface InteractiveSkillsProps {
  skills: Record<string, readonly string[]>;
}

export const InteractiveSkills: React.FC<InteractiveSkillsProps> = ({
  skills,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Object.keys(skills);
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const currentSkills = selectedCategory
    ? skills[selectedCategory]
    : categories.flatMap((cat) => skills[cat]);

  return (
    <div className="space-y-6">
      {/* Tabs for categories */}
      <Tabs
        defaultValue="all"
        className="mb-4 flex flex-wrap justify-start gap-4"
      >
        <TabsList>
          <TabsTrigger value="all" onClick={() => setSelectedCategory(null)}>
            All Skills
          </TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Content for each category */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory || "all"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="mx-auto mt-6 flex flex-wrap items-center justify-center gap-3"
          >
            {currentSkills.map((skill, index) => (
              <motion.div
                key={`${skill}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.08, y: -2 }}
                transition={{
                  delay: index * 0.025,
                  duration: 0.2,
                  type: "spring",
                  stiffness: 300,
                }}
              >
                <Badge
                  variant="secondary"
                  className="flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100 px-3 py-2 text-sm shadow-sm transition-all duration-200 hover:border-primary/30 hover:from-primary/10 hover:to-primary/5 hover:shadow-md"
                >
                  {getSkillIcon(skill)}
                  <span className="font-medium">{skill}</span>
                </Badge>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  );
};
