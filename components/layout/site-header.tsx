"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { mainNav, MAIN_PHONE, WHATSAPP_URL } from "@/content/site";
import { ButtonLink } from "@/components/ui/button";

// Header: a utility bar on wide screens, then the logo, the main navigation and a menu button.
// The full navigation needs about 1,400px, so it shows from 1536px; smaller screens use the menu.
// Only one dropdown or group is open at a time. Clicking outside, pressing Escape or choosing a link closes them.
export function SiteHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function closeIfOutside(event: PointerEvent) {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setOpenGroup(null);
        setMenuOpen(false);
      }
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenGroup(null);
        setMenuOpen(false);
      }
    }
    document.addEventListener("pointerdown", closeIfOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeIfOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  // Any link inside the navigation closes it, so the page the visitor lands on is not hidden behind a panel.
  function closeAfterLink(event: MouseEvent<HTMLElement>) {
    if ((event.target as HTMLElement).closest("a")) {
      setOpenGroup(null);
      setMenuOpen(false);
    }
  }

  function toggleGroup(key: string) {
    setOpenGroup((current) => (current === key ? null : key));
  }

  return (
    <header ref={headerRef} className="sticky top-0 z-40 border-b border-line bg-surface">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-forest focus:px-4 focus:py-2 focus:text-ivory"
      >
        Skip to content
      </a>

      <div className="hidden bg-forest text-ivory xl:block">
        <div className="mx-auto flex h-9 max-w-[1200px] items-center justify-between gap-6 px-8 text-[13px] font-semibold">
          <nav aria-label="Utility" className="flex items-center gap-5">
            <Link href="/en/news" className="hover:underline">News</Link>
            <Link href="/en/careers" className="hover:underline">Careers</Link>
            <Link href="/en/contact" className="hover:underline">Contact</Link>
            <Link href="/en/search" className="hover:underline">Search</Link>
            <Link href="/en/join" className="font-bold text-gold hover:underline">Join the network</Link>
            <Link href="/en/request-a-quote" className="font-bold text-gold hover:underline">Request a quote</Link>
          </nav>
          <div className="flex shrink-0 items-center gap-5">
            {MAIN_PHONE ? (
              <a href={`tel:${MAIN_PHONE.replace(/\s/g, "")}`} className="hover:underline">
                {MAIN_PHONE}
              </a>
            ) : null}
            {WHATSAPP_URL ? (
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:underline">
                Chat on WhatsApp
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-4 md:h-20 md:px-8 2xl:max-w-[1440px]">
        <Link href="/en" aria-label="AAAN home" className="flex min-w-0 shrink items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logos/svg/aaan-logo-horizontal.svg" alt="AAAN" className="h-9 w-auto max-w-full md:h-11" />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 2xl:flex" onClick={closeAfterLink}>
          {mainNav.map((item) =>
            item.children ? (
              <div key={item.label} className="relative">
                <button
                  type="button"
                  aria-expanded={openGroup === item.label}
                  aria-controls={`menu-${item.href}`}
                  onClick={() => toggleGroup(item.label)}
                  className="flex cursor-pointer items-center gap-1 whitespace-nowrap rounded-md px-2.5 py-2 text-[14px] font-semibold text-ink hover:text-ink-brand"
                >
                  {item.label}
                  <span aria-hidden="true" className={`text-[10px] transition-transform ${openGroup === item.label ? "rotate-180" : ""}`}>
                    ▼
                  </span>
                </button>
                <div
                  id={`menu-${item.href}`}
                  hidden={openGroup !== item.label}
                  className="absolute left-0 top-full z-50 mt-2 w-80 rounded-lg border border-line bg-surface p-3 shadow-[0_12px_40px_rgba(15,26,20,0.14)]"
                >
                  <Link href={item.href} className="block rounded-md px-3 py-2 text-[14px] font-bold text-ink-brand hover:bg-surface-ivory">
                    Overview
                  </Link>
                  {item.children.map((child) => (
                    <Link key={child.href} href={child.href} className="block rounded-md px-3 py-2 text-[14px] text-ink hover:bg-surface-ivory">
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={item.href} href={item.href} className="whitespace-nowrap rounded-md px-2.5 py-2 text-[14px] font-semibold text-ink hover:text-ink-brand">
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex min-h-11 shrink-0 cursor-pointer items-center rounded-md border border-line-strong px-4 text-[14px] font-bold text-forest 2xl:hidden"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {menuOpen ? (
        <>
          {/* Tapping the dimmed area below the panel closes the menu. */}
          <div aria-hidden="true" onClick={() => setMenuOpen(false)} className="fixed inset-x-0 bottom-0 top-16 bg-ink/40 md:top-20 2xl:hidden" />
        <div
          id="mobile-menu"
          onClick={closeAfterLink}
          className="absolute inset-x-0 top-full max-h-[70dvh] overflow-y-auto border-b border-line bg-surface shadow-[0_12px_40px_rgba(15,26,20,0.14)] 2xl:hidden"
        >
          <div className="mx-auto max-w-[1200px] px-4 py-4 md:px-8">
            <nav aria-label="Mobile">
              <ul className="divide-y divide-line">
                {mainNav.map((item) => (
                  <li key={item.label} className="py-1">
                    {item.children ? (
                      <>
                        <button
                          type="button"
                          aria-expanded={openGroup === `m:${item.label}`}
                          onClick={() => toggleGroup(`m:${item.label}`)}
                          className="flex min-h-11 w-full items-center justify-between rounded-md px-3 text-left text-[16px] font-semibold text-ink hover:bg-surface-ivory"
                        >
                          {item.label}
                          <span aria-hidden="true" className={`text-[12px] transition-transform ${openGroup === `m:${item.label}` ? "rotate-180" : ""}`}>
                            ▼
                          </span>
                        </button>
                        {openGroup === `m:${item.label}` ? (
                          <ul className="mb-2 ml-3 border-l border-line pl-3">
                            <li>
                              <Link href={item.href} className="block rounded-md px-3 py-2 text-[15px] font-bold text-ink-brand hover:bg-surface-ivory">
                                Overview
                              </Link>
                            </li>
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <Link href={child.href} className="block rounded-md px-3 py-2 text-[15px] text-ink-muted hover:text-ink-brand">
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </>
                    ) : (
                      <Link href={item.href} className="flex min-h-11 items-center rounded-md px-3 text-[16px] font-semibold text-ink hover:bg-surface-ivory">
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
                <li className="py-1">
                  <Link href="/en/search" className="flex min-h-11 items-center rounded-md px-3 text-[16px] font-semibold text-ink hover:bg-surface-ivory">
                    Search
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <ButtonLink href="/en/join" variant="ghost">Join the network</ButtonLink>
              <ButtonLink href="/en/request-a-quote" variant="gold">Request a quote</ButtonLink>
            </div>

            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-4 text-[15px] font-semibold text-ink">
              {MAIN_PHONE ? (
                <a href={`tel:${MAIN_PHONE.replace(/\s/g, "")}`} className="flex min-h-11 items-center text-ink-brand underline-offset-4 hover:underline">
                  {MAIN_PHONE}
                </a>
              ) : null}
              {WHATSAPP_URL ? (
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center text-ink-brand underline-offset-4 hover:underline">
                  Chat on WhatsApp
                </a>
              ) : null}
            </div>
          </div>
        </div>
        </>
      ) : null}
    </header>
  );
}
