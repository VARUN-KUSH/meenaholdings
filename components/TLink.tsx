"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps } from "react";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

/** Internal link that plays the page transition before navigating. */
export default function TLink({ href, onClick, ...rest }: Props) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      {...rest}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        if (!href.startsWith("/")) return;
        e.preventDefault();
        if (href === pathname) {
          window.__lenis ? window.__lenis.scrollTo(0) : window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
        window.dispatchEvent(new CustomEvent("mh:navigate", { detail: href }));
      }}
    />
  );
}
