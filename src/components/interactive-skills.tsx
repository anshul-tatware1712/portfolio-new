"use client";

import React from "react";
import { SKILLS_ICONS } from "@/data/resume-data";
import Image from "next/image";

export const InteractiveSkills: React.FC<{
  skills: Record<string, readonly string[]>;
}> = () => {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {SKILLS_ICONS.map((tech) => (
        <div
          key={tech.name}
          className="group relative flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-2 shadow-sm transition-all duration-200 hover:z-10 hover:scale-110 hover:border-primary/30 hover:shadow-md dark:border-gray-700 dark:from-gray-800 dark:to-gray-900"
        >
          <Image
            src={tech.icon}
            alt={tech.name}
            width={22}
            height={22}
            className="object-contain transition-transform duration-200 group-hover:scale-110"
            unoptimized
          />
          {/* Tooltip */}
          <span className="pointer-events-none absolute -top-8 left-1/2 z-50 -translate-x-1/2 whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-[10px] font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 dark:bg-gray-100 dark:text-gray-900">
            {tech.name}
          </span>
        </div>
      ))}
    </div>
  );
};
