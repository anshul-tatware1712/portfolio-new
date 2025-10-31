"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";
import { usePostHog } from "posthog-js/react";
import "lenis/dist/lenis.css";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Dynamically import Lenis only on client side
    const initLenis = async () => {
      const Lenis = (await import("lenis")).default;

      const lenis = new Lenis({
        autoRaf: true,
      });

      // Optional: Log scroll events for debugging
      if (process.env.NODE_ENV === "development") {
        lenis.on("scroll", (e) => {
          console.log("Lenis scroll:", e);
        });
      }

      return () => {
        lenis.destroy();
      };
    };

    const cleanup = initLenis();

    return () => {
      cleanup.then((fn) => fn?.());
    };
  }, []);

  return children;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY as string, {
      api_host:
        process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
      capture_pageview: false, // Disable automatic pageview capture, as we capture manually
    });
  }, []);

  return (
    <PHProvider client={posthog}>
      <LenisProvider>
        <SuspendedPostHogPageView />
        {children}
      </LenisProvider>
    </PHProvider>
  );
}

function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthog = usePostHog();

  // Track pageviews
  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname;
      if (searchParams.toString()) {
        url = url + "?" + searchParams.toString();
      }

      posthog.capture("$pageview", { $current_url: url });
    }
  }, [pathname, searchParams, posthog]);

  return null;
}

// Wrap PostHogPageView in Suspense to avoid the useSearchParams usage above
// from de-opting the whole app into client-side rendering
// See: https://nextjs.org/docs/messages/deopted-into-client-rendering
function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  );
}
