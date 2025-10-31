"use client";

import {
  BriefcaseIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CodeIcon,
  DraftingCompassIcon,
  GraduationCapIcon,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

import { cn } from "@/lib/utils";

const iconMap = {
  code: CodeIcon,
  design: DraftingCompassIcon,
  business: BriefcaseIcon,
  education: GraduationCapIcon,
} as const;

/**
 * Represents the valid keys of the `iconMap` object, used to specify the type of icon
 * associated with an experience position.
 */
export type ExperiencePositionIconType = keyof typeof iconMap;

export type ExperiencePositionItemType = {
  /** Unique identifier for the position */
  id: string;
  /** The job title or position name */
  title: string;
  /** The period during which the position was held (e.g., "Jan 2020 - Dec 2021") */
  employmentPeriod: string;
  /** The type of employment (e.g., "Full-time", "Part-time", "Contract") */
  employmentType?: string;
  /** A brief description of the position or responsibilities */
  description?: string;
  /** An icon representing the position */
  icon?: ExperiencePositionIconType;
  /** A list of skills associated with the position */
  skills?: string[];
  /** Indicates if the position details are expanded in the UI */
  isExpanded?: boolean;
};

// Education-specific types
export type EducationPositionItemType = {
  /** Unique identifier for the education position */
  id: string;
  /** The degree or certification name */
  degree: string;
  /** The field of study */
  field: string;
  /** The period during which the education was pursued */
  educationPeriod: string;
  /** The type of education (e.g., "Undergraduate", "Graduate", "Secondary", "Certification") */
  educationType?: string;
  /** A brief description of the education or achievements */
  description?: string;
  /** An icon representing the education type */
  icon?: ExperiencePositionIconType;
  /** A list of skills learned */
  skills?: string[];
  /** A list of relevant coursework */
  coursework?: string[];
  /** Indicates if the education details are expanded in the UI */
  isExpanded?: boolean;
};

export type ExperienceItemType = {
  /** Unique identifier for the experience item */
  id: string;
  /** Name of the company where the experience was gained */
  companyName: string;
  /** URL or path to the company's logo image */
  companyLogo?: string;
  /** List of positions held at the company */
  positions: ExperiencePositionItemType[];
  /** Indicates if this is the user's current employer */
  isCurrentEmployer?: boolean;
};

export type EducationItemType = {
  /** Unique identifier for the education item */
  id: string;
  /** Name of the institution where the education was pursued */
  institutionName: string;
  /** URL or path to the institution's logo image */
  institutionLogo?: string;
  /** List of education positions/degrees at the institution */
  positions: EducationPositionItemType[];
  /** Indicates if this is current education */
  isCurrentEducation?: boolean;
};

export function WorkExperience({
  className,
  experiences,
}: {
  className?: string;
  experiences: ExperienceItemType[];
}) {
  return (
    <div className={cn("bg-background px-4", className)}>
      {experiences.map((experience) => (
        <ExperienceItem key={experience.id} experience={experience} />
      ))}
    </div>
  );
}

export function ExperienceItem({
  experience,
}: {
  experience: ExperienceItemType;
}) {
  return (
    <div className="space-y-4 py-4">
      <div className="not-prose flex items-center gap-3">
        <div
          className="flex size-6 shrink-0 items-center justify-center"
          aria-hidden
        >
          {experience.companyLogo ? (
            <Image
              src={experience.companyLogo}
              alt={experience.companyName}
              width={24}
              height={24}
              quality={100}
              className="rounded-full"
              unoptimized
            />
          ) : (
            <span className="flex size-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
          )}
        </div>

        <h3 className="text-lg font-medium leading-snug">
          {experience.companyName}
        </h3>

        {experience.isCurrentEmployer && (
          <span className="relative flex items-center justify-center">
            <span className="absolute inline-flex size-3 animate-ping rounded-full bg-blue-500 opacity-50" />
            <span className="relative inline-flex size-2 rounded-full bg-blue-500" />
            <span className="sr-only">Current Employer</span>
          </span>
        )}
      </div>

      <div className="relative space-y-4 before:absolute before:left-3 before:h-full before:w-px before:bg-border">
        {experience.positions.map((position) => (
          <ExperiencePositionItem key={position.id} position={position} />
        ))}
      </div>
    </div>
  );
}

export function EducationItem({ education }: { education: EducationItemType }) {
  return (
    <div className="space-y-4 py-4">
      <div className="not-prose flex items-center gap-3">
        <div
          className="flex size-6 shrink-0 items-center justify-center"
          aria-hidden
        >
          {education.institutionLogo ? (
            <Image
              src={education.institutionLogo}
              alt={education.institutionName}
              width={24}
              height={24}
              quality={100}
              className="rounded-full"
              unoptimized
            />
          ) : (
            <span className="flex size-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
          )}
        </div>

        <h3 className="text-lg font-medium leading-snug">
          {education.institutionName}
        </h3>

        {education.isCurrentEducation && (
          <span className="relative flex items-center justify-center">
            <span className="absolute inline-flex size-3 animate-ping rounded-full bg-blue-500 opacity-50" />
            <span className="relative inline-flex size-2 rounded-full bg-blue-500" />
            <span className="sr-only">Currently Studying</span>
          </span>
        )}
      </div>

      <div className="relative space-y-4 before:absolute before:left-3 before:h-full before:w-px before:bg-border">
        {education.positions.map((position) => (
          <EducationPositionItem key={position.id} position={position} />
        ))}
      </div>
    </div>
  );
}

// Education component wrapper
export function Education({
  className,
  educations,
}: {
  className?: string;
  educations: EducationItemType[];
}) {
  return (
    <div className={cn("bg-background px-4", className)}>
      {educations.map((education) => (
        <EducationItem key={education.id} education={education} />
      ))}
    </div>
  );
}

export function ExperiencePositionItem({
  position,
}: {
  position: ExperiencePositionItemType;
}) {
  const [isOpen, setIsOpen] = useState(position.isExpanded || false);
  const ExperienceIcon = iconMap[position.icon || "business"];

  return (
    <div className="relative last:before:absolute last:before:h-full last:before:w-4 last:before:bg-background">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group/experience not-prose block w-full select-none text-left"
      >
        <div className="z-1 relative mb-1 flex items-center gap-3 bg-background">
          <div
            className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground"
            aria-hidden
          >
            <ExperienceIcon className="size-4" />
          </div>

          <h4 className="flex-1 text-balance text-base font-medium">
            {position.title}
          </h4>

          <div
            className="shrink-0 text-muted-foreground [&_svg]:size-4"
            aria-hidden
          >
            {isOpen ? (
              <ChevronUpIcon className="size-4" />
            ) : (
              <ChevronDownIcon className="size-4" />
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 pl-9 text-sm text-muted-foreground">
          {position.employmentType && (
            <>
              <dl>
                <dt className="sr-only">Employment Type</dt>
                <dd>{position.employmentType}</dd>
              </dl>
              <span className="text-muted-foreground">•</span>
            </>
          )}

          <dl>
            <dt className="sr-only">Employment Period</dt>
            <dd>{position.employmentPeriod}</dd>
          </dl>
        </div>
      </button>

      {isOpen && (
        <div className="overflow-hidden">
          {position.description && (
            <Prose className="pl-9 pt-2">
              <ReactMarkdown>{position.description}</ReactMarkdown>
            </Prose>
          )}

          {Array.isArray(position.skills) && position.skills.length > 0 && (
            <ul className="not-prose flex flex-wrap gap-1.5 pl-9 pt-2">
              {position.skills.map((skill, index) => (
                <li key={index} className="flex">
                  <Skill>{skill}</Skill>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export function EducationPositionItem({
  position,
}: {
  position: EducationPositionItemType;
}) {
  const [isOpen, setIsOpen] = useState(position.isExpanded || false);
  const EducationIcon = iconMap[position.icon || "education"];

  return (
    <div className="relative last:before:absolute last:before:h-full last:before:w-4 last:before:bg-background">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group/experience not-prose block w-full select-none text-left"
      >
        <div className="z-1 relative mb-1 flex items-center gap-3 bg-background">
          <div
            className="flex size-6 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground"
            aria-hidden
          >
            <EducationIcon className="size-4" />
          </div>

          <h4 className="flex-1 text-balance text-base font-medium">
            {position.degree}
            {position.field && (
              <span className="text-muted-foreground">
                {" "}
                in {position.field}
              </span>
            )}
          </h4>

          <div
            className="shrink-0 text-muted-foreground [&_svg]:size-4"
            aria-hidden
          >
            {isOpen ? (
              <ChevronUpIcon className="size-4" />
            ) : (
              <ChevronDownIcon className="size-4" />
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 pl-9 text-sm text-muted-foreground">
          {position.educationType && (
            <>
              <dl>
                <dt className="sr-only">Education Type</dt>
                <dd>{position.educationType}</dd>
              </dl>
              <span className="text-muted-foreground">•</span>
            </>
          )}

          <dl>
            <dt className="sr-only">Education Period</dt>
            <dd>{position.educationPeriod}</dd>
          </dl>
        </div>
      </button>

      {isOpen && (
        <div className="overflow-hidden">
          {position.description && (
            <Prose className="pl-9 pt-2">
              <ReactMarkdown>{position.description}</ReactMarkdown>
            </Prose>
          )}

          {Array.isArray(position.coursework) &&
            position.coursework.length > 0 && (
              <div className="pl-9 pt-2">
                <h5 className="mb-2 text-sm font-medium text-foreground">
                  Relevant Coursework
                </h5>
                <ul className="not-prose flex flex-wrap gap-1.5">
                  {position.coursework.map((course, index) => (
                    <li key={index} className="flex">
                      <Skill className="border-blue-200 bg-blue-500/10 text-blue-600 dark:border-blue-800 dark:bg-blue-500/20 dark:text-blue-400">
                        {course}
                      </Skill>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          {Array.isArray(position.skills) && position.skills.length > 0 && (
            <div className="pl-9 pt-2">
              <h5 className="mb-2 text-sm font-medium text-foreground">
                Skills Learned
              </h5>
              <ul className="not-prose flex flex-wrap gap-1.5">
                {position.skills.map((skill, index) => (
                  <li key={index} className="flex">
                    <Skill>{skill}</Skill>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Prose({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "prose prose-sm prose-zinc dark:prose-invert max-w-none font-mono text-foreground",
        "prose-a:font-medium prose-a:break-words prose-a:text-foreground prose-a:underline prose-a:underline-offset-4",
        "prose-code:rounded-md prose-code:border prose-code:bg-muted/50 prose-code:px-[0.3rem] prose-code:py-[0.2rem] prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none",
        className,
      )}
      {...props}
    />
  );
}

function Skill({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-lg border bg-muted/50 px-1.5 py-0.5 font-mono text-xs text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
}
