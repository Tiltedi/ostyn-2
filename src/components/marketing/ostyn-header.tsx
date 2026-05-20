"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu01 } from "@untitledui/icons";
import { cx } from "@/utils/cx";

export type ProductSlug = "tuinhuis" | "carport" | "garage" | "poolhouse" | "veranda" | "pergola";

const productNav: { label: string; href: string; slug?: ProductSlug }[] = [
    { label: "tuinhuis", href: "/tuinhuis", slug: "tuinhuis" },
    { label: "carport", href: "#", slug: "carport" },
    { label: "garage", href: "#", slug: "garage" },
    { label: "poolhouse", href: "/", slug: "poolhouse" },
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

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 80);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
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
                            aria-label="Menu openen"
                            className="flex items-center justify-center p-1 outline-focus-ring transition hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2"
                        >
                            <Menu01 className="size-6 text-black" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};
