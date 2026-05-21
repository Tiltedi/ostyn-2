"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu01, X } from "@untitledui/icons";
import { cx } from "@/utils/cx";

export type ProductSlug = "tuinhuis" | "carport" | "garage" | "poolhouse" | "veranda" | "pergola";

const productNav: { label: string; href: string; slug?: ProductSlug }[] = [
    { label: "tuinhuis", href: "/tuinhuis", slug: "tuinhuis" },
    { label: "carport", href: "#", slug: "carport" },
    { label: "garage", href: "#", slug: "garage" },
    { label: "poolhouse", href: "/poolhouse", slug: "poolhouse" },
    { label: "veranda", href: "#", slug: "veranda" },
    { label: "pergola", href: "#", slug: "pergola" },
    { label: "realisaties", href: "#realisaties" },
];

const OstynLogo = ({ className }: { className?: string }) => (
    <img
        src="/logo-ostyn.png"
        alt="Ostyn"
        className={cx("h-11 w-auto transition-[height] duration-300 ease-out md:h-14", className)}
    />
);

export const OstynHeader = ({ activeProduct }: { activeProduct?: ProductSlug }) => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 80);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (!menuOpen) return;
        const previous = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setMenuOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = previous;
            window.removeEventListener("keydown", onKey);
        };
    }, [menuOpen]);

    const closeMenu = () => setMenuOpen(false);

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-white">
                <div className="mx-auto max-w-container px-4 md:px-8">
                    <div
                        aria-hidden={scrolled || undefined}
                        className={cx(
                            "hidden overflow-hidden transition-[height,opacity] duration-300 ease-out md:flex md:items-center md:justify-end md:gap-5",
                            scrolled ? "md:h-0 md:opacity-0" : "md:h-6 md:opacity-100",
                        )}
                    >
                        <a
                            href="#"
                            tabIndex={scrolled ? -1 : undefined}
                            className="flex items-center gap-1.5 text-xs text-black/60 outline-focus-ring transition hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                            klantenportaal
                            <ArrowUpRight className="size-3.5" aria-hidden="true" />
                        </a>
                        <button
                            type="button"
                            tabIndex={scrolled ? -1 : undefined}
                            className="flex items-center gap-1 text-xs text-black/60 outline-focus-ring transition hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                            nl
                            <ChevronDown className="size-3.5" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="flex h-16 items-end justify-between gap-6 pb-3 md:h-14 md:pb-3">
                        <a href="/" aria-label="Ostyn — startpagina" className="flex items-center">
                            <OstynLogo className={scrolled ? "md:!h-9" : undefined} />
                        </a>

                        <nav aria-label="Hoofdnavigatie" className="hidden md:block">
                            <ul className="flex items-center gap-6 lg:gap-8">
                                {productNav.map((item) => {
                                    const isActive = item.slug !== undefined && item.slug === activeProduct;
                                    return (
                                        <li key={item.label}>
                                            <a
                                                href={item.href}
                                                className={cx(
                                                    "text-md text-black outline-focus-ring transition hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2",
                                                    isActive && "font-bold",
                                                )}
                                                aria-current={isActive ? "page" : undefined}
                                            >
                                                {item.label}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>

                        <div className="flex items-center gap-5">
                            <a
                                href="#offerte"
                                className="text-md text-[#C19848] outline-focus-ring transition hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 max-md:hidden"
                            >
                                afspraak maken
                            </a>
                            <button
                                type="button"
                                aria-label={menuOpen ? "Menu sluiten" : "Menu openen"}
                                aria-expanded={menuOpen}
                                aria-controls="ostyn-mobile-menu"
                                onClick={() => setMenuOpen((open) => !open)}
                                className="flex items-center justify-center p-1 outline-focus-ring transition hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                                {menuOpen ? (
                                    <X className="size-6 text-black" aria-hidden="true" />
                                ) : (
                                    <Menu01 className="size-6 text-black" aria-hidden="true" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div
                id="ostyn-mobile-menu"
                role="dialog"
                aria-modal="true"
                aria-label="Hoofdmenu"
                aria-hidden={!menuOpen}
                className={cx(
                    "fixed inset-0 z-[60] flex flex-col bg-white transition-opacity duration-300 ease-out",
                    menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
                )}
            >
                <div className="mx-auto flex w-full max-w-container items-center justify-between px-4 pt-4 pb-3 md:px-8 md:pt-6">
                    <a href="/" aria-label="Ostyn — startpagina" onClick={closeMenu} className="flex items-center">
                        <OstynLogo />
                    </a>
                    <button
                        type="button"
                        aria-label="Menu sluiten"
                        onClick={closeMenu}
                        className="flex items-center justify-center p-1 outline-focus-ring transition hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2"
                    >
                        <X className="size-6 text-black" aria-hidden="true" />
                    </button>
                </div>

                <nav aria-label="Hoofdmenu" className="mx-auto flex w-full max-w-container flex-1 flex-col justify-center px-4 md:px-8">
                    <ul className="flex flex-col gap-5 md:gap-6">
                        {productNav.map((item) => {
                            const isActive = item.slug !== undefined && item.slug === activeProduct;
                            return (
                                <li key={item.label}>
                                    <a
                                        href={item.href}
                                        onClick={closeMenu}
                                        aria-current={isActive ? "page" : undefined}
                                        className={cx(
                                            "block text-display-xs text-black outline-focus-ring transition hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 md:text-display-sm",
                                            isActive ? "font-extrabold" : "font-medium",
                                        )}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                <div className="mx-auto w-full max-w-container border-t border-black/10 px-4 py-6 md:px-8 md:py-8">
                    <a
                        href="#offerte"
                        onClick={closeMenu}
                        className="block text-xl font-semibold text-[#C19848] outline-focus-ring transition hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 md:text-2xl"
                    >
                        afspraak maken →
                    </a>
                    <div className="mt-5 flex items-center gap-5 text-sm text-black/60">
                        <a
                            href="#"
                            onClick={closeMenu}
                            className="flex items-center gap-1.5 outline-focus-ring transition hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                            klantenportaal
                            <ArrowUpRight className="size-3.5" aria-hidden="true" />
                        </a>
                        <span aria-hidden="true" className="text-black/20">·</span>
                        <button
                            type="button"
                            className="flex items-center gap-1 outline-focus-ring transition hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                            nl
                            <ChevronDown className="size-3.5" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
