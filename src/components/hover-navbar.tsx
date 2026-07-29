"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import {
  ArrowUpIcon,
  BriefcaseIcon,
  User2Icon,
  LayersIcon,
  BookOpenIcon,
  ShieldCheckIcon,
  CodeIcon,
  SunIcon,
  MoonIcon,
} from "lucide-react";
import { scrollToSection } from "@/lib/utils";

interface NavbarProps {
  links?: { url: string; title: string }[];
}

export function HoverNavbar({ links = [] }: NavbarProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleDarkMode = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const navItems = [
    { name: "Top", icon: <ArrowUpIcon className="h-[18px] w-[18px]" />, href: "#top" },
    {
      name: "About",
      icon: <User2Icon className="h-[18px] w-[18px]" />,
      href: "#about",
    },
    {
      name: "Work",
      icon: <BriefcaseIcon className="h-[18px] w-[18px]" />,
      href: "#work",
    },
    {
      name: "Skills",
      icon: <CodeIcon className="h-[18px] w-[18px]" />,
      href: "#skills",
    },
    {
      name: "Projects",
      icon: <LayersIcon className="h-[18px] w-[18px]" />,
      href: "#projects",
    },
    {
      name: "Education",
      icon: <BookOpenIcon className="h-[18px] w-[18px]" />,
      href: "#education",
    },
    {
      name: "Certifications",
      icon: <ShieldCheckIcon className="h-[18px] w-[18px]" />,
      href: "#certifications",
    },
  ];

  // Handle navigation and smooth scrolling
  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    if (href.startsWith("#")) {
      scrollToSection(href.substring(1));
    } else {
      window.location.href = href;
    }
  };

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-2 md:pb-4"
      style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}
    >
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-full border border-gray-200 bg-white/80 shadow-xl backdrop-blur-xl dark:border-neutral-800 dark:bg-black/80"
      >
        <nav className="flex items-center space-x-1 px-3 py-2">
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full transition-all hover:bg-gray-100 dark:hover:bg-neutral-800"
              asChild
              title={item.name}
            >
              <a
                href={item.href}
                onClick={(e) => handleNavigation(e, item.href)}
              >
                {item.icon}
              </a>
            </Button>
          ))}

          {/* Divider */}
          <div className="mx-1 h-5 w-px bg-gray-200 dark:bg-neutral-700" />

          {/* Dark mode toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full transition-all hover:bg-gray-100 dark:hover:bg-neutral-800"
            onClick={toggleDarkMode}
            title={isDark ? "Light mode" : "Dark mode"}
          >
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <SunIcon className="h-5 w-5 text-yellow-400" />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <MoonIcon className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>
        </nav>
      </motion.div>
    </div>
  );
}
