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

export function EducationItem({
  education,
  compact = false,
}: {
  education: EducationItemType;
  compact?: boolean;
}) {
  return (
    <div className={cn(compact ? "mt-2" : "mt-4")}>
      {education.positions.map((position) => (
        <EducationPositionItem
          key={position.id}
          position={position}
          institutionName={education.institutionName}
          institutionLogo={education.institutionLogo}
          compact={compact}
        />
      ))}
    </div>
  );
}

// Education component wrapper
export function Education({
  className,
  educations,
  compact = false,
}: {
  className?: string;
  educations: EducationItemType[];
  compact?: boolean;
}) {
  return (
    <div className={cn("bg-background", compact ? "px-0" : "px-4", className)}>
      {educations.map((education) => (
        <EducationItem
          key={education.id}
          education={education}
          compact={compact}
        />
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
  institutionName,
  institutionLogo,
  compact = false,
}: {
  position: EducationPositionItemType;
  institutionName?: string;
  institutionLogo?: string;
  compact?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(position.isExpanded || false);

  if (compact) {
    const hasDetails = Boolean(position.description || position.skills?.length);

    return (
      <div className="border-b border-border/60 last:border-0">
        <button
          type="button"
          onClick={() => hasDetails && setIsOpen(!isOpen)}
          aria-expanded={hasDetails ? isOpen : undefined}
          className="flex min-h-10 w-full min-w-0 items-center gap-2 py-2 text-left"
        >
          <span
            className="min-w-0 flex-1 truncate text-sm font-medium"
            title={position.degree}
          >
            {position.degree}
          </span>
          {position.field && (
            <>
              <span className="text-muted-foreground" aria-hidden="true">
                ·
              </span>
              <span
                className="hidden max-w-[35%] truncate text-sm text-muted-foreground sm:inline"
                title={position.field}
              >
                {position.field}
              </span>
            </>
          )}
          <span className="ml-auto shrink-0 text-xs tabular-nums text-muted-foreground">
            {position.educationPeriod}
          </span>
          {hasDetails && (
            <ChevronDownIcon
              className={cn(
                "size-3 shrink-0 text-muted-foreground transition-transform",
                isOpen && "rotate-180",
              )}
              aria-hidden="true"
            />
          )}
        </button>
        {isOpen && hasDetails && (
          <div className="space-y-2 pb-3 pr-5 text-sm text-muted-foreground">
            {position.description && <p>{position.description}</p>}
            {position.skills && position.skills.length > 0 && (
              <ul className="flex flex-wrap gap-1.5">
                {position.skills.map((skill) => (
                  <li key={skill}>
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

  return (
    <div className="group flex gap-4 pb-2">
      {/* Timeline dot indicator */}
      <div className="relative z-10 mt-1.5 flex h-3 w-3 flex-shrink-0 items-center justify-center">
        <span className="h-3 w-3 rounded-full border-2 border-primary bg-background transition-colors duration-300 group-hover:bg-primary" />
      </div>

      {/* Content card */}
      <div className="flex-1">
        <div className="rounded-lg border border-muted bg-card p-4 shadow-sm transition-all duration-300 hover:bg-card/95 hover:shadow group-hover:border-muted/80">
          <div className="mb-1 flex flex-col justify-between gap-2 md:flex-row md:items-center">
            <h3 className="text-base font-medium">
              {institutionName || position.degree}
            </h3>
            <div className="text-sm tabular-nums text-muted-foreground">
              {position.educationPeriod}
            </div>
          </div>

          <div className="mb-2 flex flex-wrap items-center gap-1">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {position.degree}
              {position.field && (
                <span className="text-muted-foreground">
                  {" "}
                  — {position.field}
                </span>
              )}
            </span>
            <div className="flex-1" />
            {position.educationType && (
              <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs text-muted-foreground">
                {position.educationType}
              </span>
            )}
          </div>

          {/* Expandable section */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="mt-1 flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            {isOpen ? (
              <>
                <ChevronUpIcon className="size-3" /> Hide details
              </>
            ) : (
              <>
                <ChevronDownIcon className="size-3" /> Show details
              </>
            )}
          </button>

          {isOpen && (
            <div className="mt-3 space-y-3">
              {position.description && (
                <p className="text-sm text-muted-foreground">
                  {position.description}
                </p>
              )}

              {Array.isArray(position.coursework) &&
                position.coursework.length > 0 && (
                  <div>
                    <h5 className="mb-2 text-xs font-medium text-foreground">
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
                <div>
                  <h5 className="mb-2 text-xs font-medium text-foreground">
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
      </div>
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
