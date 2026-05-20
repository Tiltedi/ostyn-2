"use client";

import { useState, type FC, type ReactNode } from "react";
import {
    ArrowRight,
    ArrowUpRight,
    Check,
    ChevronDown,
    ChevronRight,
    Mail01,
    MarkerPin01,
    Menu01,
    Phone,
    Star01,
    X,
} from "@untitledui/icons";
import { cx } from "@/utils/cx";

/*
 * Ostyn — Dutch (BE/Vlaams) standalone landing page.
 *
 * Hard brand rules (from ostyn.be):
 *  - Palette: #FFFFFF, #F2F2F2, #000000, #C19848 only.
 *  - Sharp corners everywhere — no border-radius.
 *  - Typography: "Shape, sans-serif" (set in theme.css; Inter as fallback).
 *  - Emphasis = inline <strong> within sentences, never color.
 *  - Formal "u"-vorm throughout.
 */

const GOLD = "#C19848";

// ─────────────────────────────────────────────────────────────────────────────
// Shared primitives — sharp-cornered CTAs and section wrappers.

const PrimaryCTA: FC<{
    href: string;
    children: ReactNode;
    className?: string;
    iconTrailing?: FC<{ className?: string }>;
}> = ({ href, children, className, iconTrailing: Icon = ArrowRight }) => (
    <a
        href={href}
        className={cx(
            "inline-flex items-center justify-center gap-2 bg-[#C19848] px-8 py-3.5 text-md font-semibold text-white transition outline-[#C19848] hover:bg-[#A6822E] focus-visible:outline-2 focus-visible:outline-offset-2",
            className,
        )}
    >
        <span>{children}</span>
        <Icon className="size-4" aria-hidden="true" />
    </a>
);

const SecondaryCTA: FC<{ href: string; children: ReactNode; className?: string }> = ({ href, children, className }) => (
    <a
        href={href}
        className={cx(
            "inline-flex items-center gap-1.5 border-b-2 border-[#C19848] pb-1 text-md font-semibold text-[#C19848] outline-[#C19848] transition hover:border-[#A6822E] hover:text-[#A6822E] focus-visible:outline-2 focus-visible:outline-offset-4",
            className,
        )}
    >
        <span>{children}</span>
        <ArrowRight className="size-4" aria-hidden="true" />
    </a>
);

const Section: FC<{
    id?: string;
    bg?: "white" | "gray" | "gold";
    children: ReactNode;
    className?: string;
    "aria-labelledby"?: string;
}> = ({ id, bg = "white", children, className, ...rest }) => {
    const bgClass = bg === "white" ? "bg-white" : bg === "gray" ? "bg-[#F2F2F2]" : "bg-[#C19848]";
    return (
        <section
            id={id}
            className={cx(bgClass, "py-20 md:py-28", className)}
            aria-labelledby={rest["aria-labelledby"]}
        >
            <div className="mx-auto max-w-container px-5 md:px-8">{children}</div>
        </section>
    );
};

const Eyebrow: FC<{ children: ReactNode; tone?: "black" | "white" }> = ({ children, tone = "black" }) => (
    <p
        className={cx(
            "text-sm font-semibold tracking-[0.22em] uppercase",
            tone === "white" ? "text-white" : "text-[#C19848]",
        )}
    >
        {children}
    </p>
);

// ─────────────────────────────────────────────────────────────────────────────
// HEADER — clean, sticky, white. Logo + nav + primary CTA.

const navLinks = [
    { label: "Poolhouse", href: "#aanbod" },
    { label: "Materialen", href: "#materialen" },
    { label: "Realisaties", href: "#realisaties" },
    { label: "Showroom", href: "#showroom" },
    { label: "Over Ostyn", href: "#waarom" },
];

const OstynLogo: FC<{ className?: string }> = ({ className }) => (
    <img src="/logo-ostyn.png" alt="Ostyn" className={cx("h-12 w-auto md:h-14", className)} />
);

const Header = () => {
    const [open, setOpen] = useState(false);
    return (
        <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-white">
            <div className="mx-auto flex h-20 max-w-container items-center justify-between gap-6 px-5 md:h-24 md:px-8">
                <a href="#top" aria-label="Ostyn — startpagina" className="flex items-center">
                    <OstynLogo />
                </a>

                <nav aria-label="Hoofdnavigatie" className="hidden lg:block">
                    <ul className="flex items-center gap-8">
                        {navLinks.map((item) => (
                            <li key={item.label}>
                                <a
                                    href={item.href}
                                    className="text-md font-semibold text-black outline-[#C19848] transition hover:text-[#C19848] focus-visible:outline-2 focus-visible:outline-offset-4"
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="flex items-center gap-4">
                    <PrimaryCTA href="#offerte" className="hidden px-6 py-3 md:inline-flex">
                        Vraag offerte
                    </PrimaryCTA>
                    <button
                        type="button"
                        aria-label={open ? "Menu sluiten" : "Menu openen"}
                        aria-expanded={open}
                        onClick={() => setOpen((v) => !v)}
                        className="flex size-10 items-center justify-center text-black outline-[#C19848] transition hover:text-[#C19848] focus-visible:outline-2 focus-visible:outline-offset-2 lg:hidden"
                    >
                        {open ? <X className="size-6" aria-hidden="true" /> : <Menu01 className="size-6" aria-hidden="true" />}
                    </button>
                </div>
            </div>

            {open && (
                <div className="border-t border-black/10 bg-white lg:hidden">
                    <ul className="mx-auto flex max-w-container flex-col gap-1 px-5 py-4">
                        {navLinks.map((item) => (
                            <li key={item.label}>
                                <a
                                    href={item.href}
                                    onClick={() => setOpen(false)}
                                    className="block py-3 text-md font-semibold text-black transition hover:text-[#C19848]"
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                        <li className="mt-3">
                            <PrimaryCTA href="#offerte" className="w-full">
                                Vraag offerte
                            </PrimaryCTA>
                        </li>
                    </ul>
                </div>
            )}
        </header>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
// HERO — aspiration first. Full-bleed photo, gold eyebrow, headline with bold words, primary CTA.

const Hero = () => (
    <section
        id="top"
        aria-labelledby="hero-titel"
        className="relative isolate flex min-h-[680px] items-center overflow-hidden bg-black md:min-h-[760px]"
    >
        <img
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=2200&q=85&auto=format&fit=crop"
            alt="Een hedendaagse Ostyn poolhouse met zwembad in een groene tuin, gefotografeerd in zacht namiddaglicht"
            className="absolute inset-0 -z-10 size-full object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/45 to-black/15" />

        <div className="mx-auto w-full max-w-container px-5 py-24 md:px-8 md:py-32">
            <div className="max-w-2xl">
                <Eyebrow>Expand your freedom</Eyebrow>
                <h1
                    id="hero-titel"
                    className="mt-5 text-4xl leading-tight font-medium text-balance text-white md:text-6xl md:leading-[1.05]"
                >
                    De poolhouse van uw <strong className="font-extrabold">dromen</strong>, volledig op{" "}
                    <strong className="font-extrabold">maat</strong> ontworpen en gebouwd.
                </h1>
                <p className="mt-6 max-w-xl text-lg text-white/90 md:text-xl">
                    Ostyn ontwerpt, produceert en plaatst exclusieve poolhouses — sinds 1992, in eigen atelier, door onze
                    eigen vakmensen. Eén partner van eerste schets tot sleutel-op-de-deur.
                </p>
                <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
                    <PrimaryCTA href="#offerte">Vraag een gratis offerte aan</PrimaryCTA>
                    <a
                        href="#realisaties"
                        className="inline-flex items-center gap-1.5 border-b-2 border-white pb-1 text-md font-semibold text-white transition hover:border-[#C19848] hover:text-[#C19848]"
                    >
                        <span>Bekijk realisaties</span>
                        <ArrowRight className="size-4" aria-hidden="true" />
                    </a>
                </div>
            </div>
        </div>
    </section>
);

// ─────────────────────────────────────────────────────────────────────────────
// HET AANBOD — short intro to what Ostyn delivers. Sets the offer & 3D-ontwerp differentiator
// before objections about price/trust kick in.

const Aanbod = () => (
    <Section id="aanbod" bg="white" aria-labelledby="aanbod-titel">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">
            <div>
                <Eyebrow>Wat is een Ostyn poolhouse</Eyebrow>
                <h2
                    id="aanbod-titel"
                    className="mt-5 text-3xl leading-tight font-medium text-balance text-black md:text-5xl md:leading-[1.1]"
                >
                    Een <strong className="font-extrabold">uniek</strong> ontwerp dat bij{" "}
                    <strong className="font-extrabold">uw woning</strong> past.
                </h2>
                <p className="mt-6 text-lg text-black/80 md:text-xl">
                    Geen standaardmodellen. Geen onderaannemers. Wij ontwerpen, produceren en plaatsen uw poolhouse{" "}
                    <strong className="font-semibold">volledig in eigen huis</strong>. U krijgt vooraf een gedetailleerd{" "}
                    <strong className="font-semibold">3D-beeld</strong> — zodat u exact ziet wat u krijgt, voordat de eerste
                    plank wordt gezaagd.
                </p>
                <ul className="mt-8 space-y-3">
                    {[
                        "Architecturaal ontwerp, afgestemd op uw woning en tuin",
                        "Eigen atelier in Dottenijs — productie volledig in eigen beheer",
                        "Plaatsing door ons eigen team, geen onderaanneming",
                        "Gratis 3D-ontwerp en vrijblijvende offerte",
                    ].map((item) => (
                        <li key={item} className="flex items-start gap-3">
                            <span
                                aria-hidden="true"
                                className="mt-0.5 flex size-6 shrink-0 items-center justify-center bg-[#C19848]"
                            >
                                <Check className="size-4 text-white" />
                            </span>
                            <span className="text-md text-black md:text-lg">{item}</span>
                        </li>
                    ))}
                </ul>
                <div className="mt-10">
                    <SecondaryCTA href="#offerte">Plan uw adviesgesprek</SecondaryCTA>
                </div>
            </div>
            <div className="relative">
                <img
                    src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=1400&q=85&auto=format&fit=crop"
                    alt="Detail van een Ostyn poolhouse in hardhout met grote schuifpartijen, uitkijk op zwembad en tuin"
                    className="aspect-[4/5] w-full object-cover"
                />
            </div>
        </div>
    </Section>
);

// ─────────────────────────────────────────────────────────────────────────────
// MATERIALEN — four bekledingen.

type Material = { name: string; description: string; image: string; alt: string };
const materials: Material[] = [
    {
        name: "Hout",
        description: "Afrormosia of vergrijzende essences. Warme uitstraling, veroudert mooi.",
        image: "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?w=1000&q=85&auto=format&fit=crop",
        alt: "Poolhouse afgewerkt in warm hardhout, gefotografeerd in tuincontext",
    },
    {
        name: "Trespa",
        description: "Onderhoudsarme HPL-panelen in talloze tinten en houtlooks. Strak en hedendaags.",
        image: "https://images.unsplash.com/photo-1564540583246-934409427776?w=1000&q=85&auto=format&fit=crop",
        alt: "Hedendaagse poolhouse-gevel in Trespa-panelen met houtlook",
    },
    {
        name: "Crepi",
        description: "Geïsoleerde gevel met gepleisterde afwerking. Tijdloos en architecturaal.",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1000&q=85&auto=format&fit=crop",
        alt: "Poolhouse met witte crepi-afwerking, modern architecturaal silhouet",
    },
    {
        name: "Aquapanel",
        description: "Vochtbestendige cementgebonden platen, basis voor crepi of natuurlijke bekleding.",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=85&auto=format&fit=crop",
        alt: "Gevelopbouw met Aquapanel als ondergrond, klaar voor afwerking",
    },
];

const Materialen = () => (
    <Section id="materialen" bg="gray" aria-labelledby="materialen-titel">
        <div className="max-w-3xl">
            <Eyebrow>Materialen en bekleding</Eyebrow>
            <h2
                id="materialen-titel"
                className="mt-5 text-3xl leading-tight font-medium text-balance text-black md:text-5xl md:leading-[1.1]"
            >
                Vier bekledingen. <strong className="font-extrabold">Eén</strong> kwaliteitseis.
            </h2>
            <p className="mt-6 text-lg text-black/80 md:text-xl">
                U kiest de uitstraling die bij uw woning past. Wij garanderen dat de afwerking onze normen haalt — of we
                plaatsen niet.
            </p>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {materials.map((m) => (
                <li key={m.name} className="flex flex-col bg-white">
                    <img src={m.image} alt={m.alt} className="aspect-[4/5] w-full object-cover" />
                    <div className="flex flex-1 flex-col p-6 md:p-7">
                        <h3 className="text-xl font-semibold text-black">{m.name}</h3>
                        <p className="mt-3 text-md text-black/70">{m.description}</p>
                    </div>
                </li>
            ))}
        </ul>
    </Section>
);

// ─────────────────────────────────────────────────────────────────────────────
// WAAROM OSTYN — direct antwoord op de "kan ik jullie vertrouwen?" objectie.

type Reason = { number: string; title: string; body: string };
const reasons: Reason[] = [
    {
        number: "01",
        title: "Volledig maatwerk",
        body: "Elk project is uniek. Wij ontwerpen rond uw woning, uw tuin en uw manier van leven — geen standaardmodellen.",
    },
    {
        number: "02",
        title: "Eigen atelier, eigen plaatsingsteam",
        body: "Geen onderaannemers. Onze vakmensen produceren in ons atelier in Dottenijs en plaatsen zelf op uw terrein.",
    },
    {
        number: "03",
        title: "30+ jaar ervaring",
        body: "Familiebedrijf sinds 1992. Duizenden gerealiseerde projecten in België en Noord-Frankrijk.",
    },
    {
        number: "04",
        title: "Gratis 3D-ontwerp",
        body: "Met onze eigen ontwerpsoftware ziet u uw poolhouse vooraf in detail — vóór u beslist, en vóór de productie start.",
    },
    {
        number: "05",
        title: "3.000 m² showroom",
        body: "De grootste overdekte showroom van België in Dottenijs, 7 dagen op 7 open. Voel materialen, vergelijk afwerkingen.",
    },
];

const Waarom = () => (
    <Section id="waarom" bg="white" aria-labelledby="waarom-titel">
        <div className="max-w-3xl">
            <Eyebrow>Waarom Ostyn</Eyebrow>
            <h2
                id="waarom-titel"
                className="mt-5 text-3xl leading-tight font-medium text-balance text-black md:text-5xl md:leading-[1.1]"
            >
                Vijf redenen om voor <strong className="font-extrabold">Ostyn</strong> te kiezen.
            </h2>
            <p className="mt-6 text-lg text-black/80 md:text-xl">
                U investeert in uw thuis. Bij Ostyn investeren we evenveel in de relatie — voor, tijdens en lang na de
                oplevering.
            </p>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-px bg-black/10 md:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r) => (
                <li key={r.number} className="flex flex-col bg-white p-8 md:p-10">
                    <span className="text-md font-semibold text-[#C19848]">{r.number}</span>
                    <h3 className="mt-6 text-xl font-semibold text-black md:text-2xl">{r.title}</h3>
                    <p className="mt-4 text-md text-black/70 md:text-lg">{r.body}</p>
                </li>
            ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-black/10 pt-10">
            <p className="text-sm font-semibold tracking-wider text-black/60 uppercase">
                Sinds 1992 vertrouwd door
            </p>
            <p className="text-md text-black">
                <strong className="font-semibold">Duizenden gezinnen</strong> in België en Noord-Frankrijk
            </p>
            <p className="text-md text-black">
                <strong className="font-semibold">Eigen klantenportaal</strong> — uw project live op te volgen
            </p>
        </div>
    </Section>
);

// ─────────────────────────────────────────────────────────────────────────────
// REALISATIES — photo grid. Visuele bewijslast.

type Project = { title: string; location: string; image: string; alt: string; size?: "tall" | "wide" | "default" };
const projects: Project[] = [
    {
        title: "Modern in Afrormosia",
        location: "Kortrijk",
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1400&q=85&auto=format&fit=crop",
        alt: "Moderne poolhouse in Afrormosia hardhout met overdekt terras en zwembad",
        size: "tall",
    },
    {
        title: "Tijdloos in crepi",
        location: "Gent",
        image: "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?w=1200&q=85&auto=format&fit=crop",
        alt: "Klassieke poolhouse met crepi-afwerking, gefotografeerd in zonnige tuin",
    },
    {
        title: "Open architectuur",
        location: "Brugge",
        image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=1200&q=85&auto=format&fit=crop",
        alt: "Open poolhouse met buitenkeuken, lounge en uitkijk op zwembad",
    },
    {
        title: "Strak en compact",
        location: "Antwerpen",
        image: "https://images.unsplash.com/photo-1564540583246-934409427776?w=1400&q=85&auto=format&fit=crop",
        alt: "Compacte hedendaagse poolhouse in donkere bekleding naast lap pool",
        size: "wide",
    },
    {
        title: "Hout en pleisterwerk",
        location: "Roeselare",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85&auto=format&fit=crop",
        alt: "Poolhouse die hardhout combineert met witte pleisterwerk-gevel",
    },
    {
        title: "Familieproject",
        location: "Lille",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=85&auto=format&fit=crop",
        alt: "Ruime poolhouse met overdekte loungezone, fotomoment einde namiddag",
    },
];

const Realisaties = () => (
    <Section id="realisaties" bg="gray" aria-labelledby="realisaties-titel">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
                <Eyebrow>Realisaties</Eyebrow>
                <h2
                    id="realisaties-titel"
                    className="mt-5 text-3xl leading-tight font-medium text-balance text-black md:text-5xl md:leading-[1.1]"
                >
                    Projecten die voor zichzelf <strong className="font-extrabold">spreken</strong>.
                </h2>
            </div>
            <p className="max-w-md text-md text-black/70 md:text-lg">
                Een greep uit onze recente poolhouses in België en Noord-Frankrijk. Elk uniek, elk volledig in eigen
                beheer gebouwd.
            </p>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {projects.map((p) => (
                <li
                    key={p.title}
                    className={cx(
                        "group relative overflow-hidden bg-black",
                        p.size === "tall" && "lg:row-span-2",
                        p.size === "wide" && "sm:col-span-2",
                    )}
                >
                    <img
                        src={p.image}
                        alt={p.alt}
                        className={cx(
                            "w-full object-cover transition duration-700 group-hover:scale-105",
                            p.size === "tall" ? "aspect-[3/5] lg:h-full" : "aspect-[4/3]",
                        )}
                    />
                    <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent"
                    />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
                        <div>
                            <p className="text-xs font-semibold tracking-wider text-white/80 uppercase">{p.location}</p>
                            <h3 className="mt-1.5 text-xl font-semibold text-white">{p.title}</h3>
                        </div>
                        <ArrowUpRight
                            className="size-6 shrink-0 text-white transition group-hover:text-[#C19848]"
                            aria-hidden="true"
                        />
                    </div>
                </li>
            ))}
        </ul>
    </Section>
);

// ─────────────────────────────────────────────────────────────────────────────
// TESTIMONIALS — vertrouwen via klantverhalen. Quotes zijn plausibele placeholders
// in Ostyn-tone; vervang door echte quotes van ostyn.be/getuigenissen/.

type Testimonial = { quote: string; author: string; project: string };
const testimonials: Testimonial[] = [
    {
        quote: "Van het eerste gesprek in de showroom tot de oplevering: één aanspreekpunt, één team. Het 3D-ontwerp gaf ons de zekerheid om te beslissen. Het resultaat is exact wat we hadden gehoopt.",
        author: "Familie Devos",
        project: "Poolhouse in Afrormosia",
    },
    {
        quote: "Wij waren onder de indruk van hoe efficiënt de plaatsing verliep. De vakmannen van Ostyn werkten netjes, snel en met respect voor onze tuin. Eindresultaat: perfect afgewerkt.",
        author: "Familie Soloch",
        project: "Crepi-poolhouse met overdekt terras",
    },
    {
        quote: "De combinatie van architecturaal ontwerp en bouwkundige expertise vind je nergens anders. Ostyn maakte van ons buitenproject één geheel met de woning.",
        author: "Familie Lechantre",
        project: "Maatwerk poolhouse, Noord-Frankrijk",
    },
];

const Testimonials = () => (
    <Section id="getuigenissen" bg="white" aria-labelledby="getuigenissen-titel">
        <div className="max-w-3xl">
            <Eyebrow>Klantgetuigenissen</Eyebrow>
            <h2
                id="getuigenissen-titel"
                className="mt-5 text-3xl leading-tight font-medium text-balance text-black md:text-5xl md:leading-[1.1]"
            >
                <strong className="font-extrabold">Vertrouwd</strong> door gezinnen in België en Noord-Frankrijk.
            </h2>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-px bg-black/10 md:grid-cols-3">
            {testimonials.map((t) => (
                <li key={t.author} className="flex flex-col bg-white p-8 md:p-10">
                    <div aria-label="5 sterren" className="flex gap-0.5 text-[#C19848]">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star01 key={i} className="size-4 fill-current" aria-hidden="true" />
                        ))}
                    </div>
                    <blockquote className="mt-6 flex-1 text-lg leading-relaxed text-black md:text-xl">
                        <p>"{t.quote}"</p>
                    </blockquote>
                    <footer className="mt-8 border-t border-black/10 pt-5">
                        <p className="text-md font-semibold text-black">{t.author}</p>
                        <p className="mt-1 text-sm text-black/60">{t.project}</p>
                    </footer>
                </li>
            ))}
        </ul>
    </Section>
);

// ─────────────────────────────────────────────────────────────────────────────
// HOE WERKT HET — proces, beantwoordt de "wat ga ik krijgen voor mijn geld?" objectie.

type Step = { number: string; title: string; body: string };
const steps: Step[] = [
    {
        number: "01",
        title: "Adviesgesprek",
        body: "U brengt een bezoek aan onze showroom in Dottenijs. We luisteren naar uw wensen, bekijken uw situatie en geven eerlijk advies.",
    },
    {
        number: "02",
        title: "3D-ontwerp en offerte",
        body: "Onze ontwerpers maken een gedetailleerd 3D-beeld van uw project, gekoppeld aan een vrijblijvende, transparante offerte.",
    },
    {
        number: "03",
        title: "Goedkeuring en productie",
        body: "Na uw definitieve goedkeuring start de productie in ons eigen atelier — onder volledige kwaliteitscontrole.",
    },
    {
        number: "04",
        title: "Plaatsing op uw terrein",
        body: "Ons eigen plaatsingsteam komt installeren. Strak gepland, met respect voor uw woning en tuin.",
    },
    {
        number: "05",
        title: "Nazorg",
        body: "Na oplevering kunt u uw project en service-aanvragen opvolgen via uw eigen klantenportaal. Wij blijven uw aanspreekpunt.",
    },
];

const Proces = () => (
    <Section id="proces" bg="gray" aria-labelledby="proces-titel">
        <div className="max-w-3xl">
            <Eyebrow>Hoe werkt het</Eyebrow>
            <h2
                id="proces-titel"
                className="mt-5 text-3xl leading-tight font-medium text-balance text-black md:text-5xl md:leading-[1.1]"
            >
                Van eerste schets tot <strong className="font-extrabold">sleutel-op-de-deur</strong>.
            </h2>
            <p className="mt-6 text-lg text-black/80 md:text-xl">
                Vijf stappen. Eén aanspreekpunt. Geen verrassingen.
            </p>
        </div>

        <ol className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5 lg:gap-0">
            {steps.map((step, i) => (
                <li
                    key={step.number}
                    className={cx(
                        "flex flex-col bg-white p-7 md:p-8",
                        i > 0 && "lg:border-l lg:border-black/10",
                    )}
                >
                    <span className="text-md font-semibold text-[#C19848]">{step.number}</span>
                    <h3 className="mt-5 text-lg font-semibold text-black md:text-xl">{step.title}</h3>
                    <p className="mt-3 text-md text-black/70">{step.body}</p>
                </li>
            ))}
        </ol>
    </Section>
);

// ─────────────────────────────────────────────────────────────────────────────
// SHOWROOM — gold section. Anchors the "3000 m² showroom" proof and routes to the showroom CTA.

const Showroom = () => (
    <section id="showroom" aria-labelledby="showroom-titel" className="bg-[#C19848]">
        <div className="mx-auto grid max-w-container grid-cols-1 lg:grid-cols-2">
            <div className="flex flex-col justify-center px-5 py-20 md:px-12 md:py-24 lg:px-16">
                <Eyebrow tone="white">Showroom in Dottenijs</Eyebrow>
                <h2
                    id="showroom-titel"
                    className="mt-5 text-3xl leading-tight font-medium text-balance text-white md:text-5xl md:leading-[1.1]"
                >
                    <strong className="font-extrabold">3.000 m²</strong> overdekt, <strong className="font-extrabold">7</strong>{" "}
                    dagen op 7 open.
                </h2>
                <p className="mt-6 text-lg text-white/90 md:text-xl">
                    Voel de materialen. Vergelijk afwerkingen. Loop door volledig opgebouwde poolhouses in onze showroom —
                    de grootste van België. Ons team neemt graag de tijd om uw project met u door te lopen.
                </p>
                <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
                    <a
                        href="#offerte"
                        className="inline-flex items-center justify-center gap-2 bg-white px-8 py-3.5 text-md font-semibold text-[#C19848] transition hover:bg-black hover:text-white"
                    >
                        <span>Plan uw bezoek</span>
                        <ArrowRight className="size-4" aria-hidden="true" />
                    </a>
                    <a
                        href="https://www.google.com/maps?q=Ostyn+Dottenijs"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 border-b-2 border-white pb-1 text-md font-semibold text-white transition hover:opacity-80"
                    >
                        <MarkerPin01 className="size-4" aria-hidden="true" />
                        <span>Dottenijs, België</span>
                    </a>
                </div>
            </div>
            <img
                src="/showroom.jpg"
                alt="Adviesgesprek in de Ostyn-showroom in Dottenijs: 3.000 m² overdekt, met opgebouwde poolhouses en materialen om in het echt te bekijken"
                className="aspect-[4/3] size-full object-cover lg:aspect-auto lg:h-full"
            />
        </div>
    </section>
);

// ─────────────────────────────────────────────────────────────────────────────
// OFFERTE — repeat CTA + contact card. Sluit de pagina af op het primaire conversiepunt.

const Offerte = () => (
    <Section id="offerte" bg="white" aria-labelledby="offerte-titel" className="py-20 md:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-3">
                <Eyebrow>Vraag uw offerte</Eyebrow>
                <h2
                    id="offerte-titel"
                    className="mt-5 text-3xl leading-tight font-medium text-balance text-black md:text-5xl md:leading-[1.1]"
                >
                    Klaar om uw <strong className="font-extrabold">dromen</strong> te realiseren?
                </h2>
                <p className="mt-6 text-lg text-black/80 md:text-xl">
                    Vraag vrijblijvend uw offerte aan. U krijgt een persoonlijk adviesgesprek, een gedetailleerd 3D-ontwerp
                    en een transparante prijsopgave — zonder verplichting.
                </p>
                <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
                    <PrimaryCTA href="https://ostyn.be/offerte-aanvragen/">
                        Vraag een gratis offerte aan
                    </PrimaryCTA>
                    <SecondaryCTA href="#">Download ons inspiratieboek</SecondaryCTA>
                </div>
            </div>

            <aside className="bg-[#F2F2F2] p-8 md:p-10 lg:col-span-2">
                <p className="text-sm font-semibold tracking-wider text-black uppercase">Of contacteer ons rechtstreeks</p>
                <ul className="mt-6 space-y-5">
                    <li className="flex items-start gap-3">
                        <Phone className="mt-0.5 size-5 shrink-0 text-[#C19848]" aria-hidden="true" />
                        <div>
                            <p className="text-xs font-semibold tracking-wider text-black/60 uppercase">Telefoon</p>
                            <a href="tel:+3256480060" className="text-md font-semibold text-black hover:text-[#C19848]">
                                +32 56 48 00 60
                            </a>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <Mail01 className="mt-0.5 size-5 shrink-0 text-[#C19848]" aria-hidden="true" />
                        <div>
                            <p className="text-xs font-semibold tracking-wider text-black/60 uppercase">E-mail</p>
                            <a href="mailto:info@ostyn.be" className="text-md font-semibold text-black hover:text-[#C19848]">
                                info@ostyn.be
                            </a>
                        </div>
                    </li>
                    <li className="flex items-start gap-3">
                        <MarkerPin01 className="mt-0.5 size-5 shrink-0 text-[#C19848]" aria-hidden="true" />
                        <div>
                            <p className="text-xs font-semibold tracking-wider text-black/60 uppercase">Showroom</p>
                            <p className="text-md font-semibold text-black">Dottenijs, België</p>
                            <p className="mt-1 text-sm text-black/70">7 dagen op 7 open, op afspraak</p>
                        </div>
                    </li>
                </ul>
                <p className="mt-8 border-t border-black/10 pt-6 text-sm text-black/70">
                    <strong className="font-semibold text-black">Familiebedrijf sinds 1992.</strong> Wij planten met Go
                    Forest een boom per gerealiseerd project.
                </p>
            </aside>
        </div>
    </Section>
);

// ─────────────────────────────────────────────────────────────────────────────
// FOOTER

const footerCols: { heading: string; links: { label: string; href: string }[] }[] = [
    {
        heading: "Productgamma",
        links: [
            { label: "Poolhouse", href: "#aanbod" },
            { label: "Veranda", href: "#" },
            { label: "Carport", href: "#" },
            { label: "Tuinhuis", href: "#" },
            { label: "Pergola", href: "#" },
        ],
    },
    {
        heading: "Ostyn",
        links: [
            { label: "Realisaties", href: "#realisaties" },
            { label: "Showroom", href: "#showroom" },
            { label: "Getuigenissen", href: "#getuigenissen" },
            { label: "Over ons", href: "#waarom" },
            { label: "Klantenportaal", href: "#" },
        ],
    },
    {
        heading: "Contact",
        links: [
            { label: "Offerte aanvragen", href: "#offerte" },
            { label: "+32 56 48 00 60", href: "tel:+3256480060" },
            { label: "info@ostyn.be", href: "mailto:info@ostyn.be" },
            { label: "Dottenijs, België", href: "https://www.google.com/maps?q=Ostyn+Dottenijs" },
        ],
    },
];

const Footer = () => (
    <footer className="border-t border-black/10 bg-white">
        <div className="mx-auto max-w-container px-5 py-16 md:px-8 md:py-20">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-16">
                <div>
                    <OstynLogo />
                    <p className="mt-6 max-w-xs text-md text-black/70">
                        Premium poolhouses op maat. Ontworpen, geproduceerd en geplaatst door één familiebedrijf — sinds
                        1992.
                    </p>
                    <p className="mt-4 text-sm font-semibold tracking-wider text-[#C19848] uppercase">
                        Expand your freedom
                    </p>
                </div>
                {footerCols.map((col) => (
                    <div key={col.heading}>
                        <p className="text-sm font-semibold tracking-wider text-black uppercase">{col.heading}</p>
                        <ul className="mt-5 space-y-3">
                            {col.links.map((link) => (
                                <li key={link.label}>
                                    <a
                                        href={link.href}
                                        className="text-md text-black/70 transition hover:text-[#C19848]"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-black/10 pt-8 md:flex-row md:items-center">
                <p className="text-sm text-black/60">
                    © {new Date().getFullYear()} Ostyn. Alle rechten voorbehouden.
                </p>
                <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    <li>
                        <a href="#" className="text-sm text-black/60 transition hover:text-[#C19848]">
                            Privacybeleid
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-sm text-black/60 transition hover:text-[#C19848]">
                            Cookiebeleid
                        </a>
                    </li>
                    <li>
                        <a href="#" className="text-sm text-black/60 transition hover:text-[#C19848]">
                            Algemene voorwaarden
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
);

// ─────────────────────────────────────────────────────────────────────────────

export default function LandingPage17() {
    return (
        <div className="bg-white text-black">
            <Header />
            <main>
                <Hero />
                <Aanbod />
                <Materialen />
                <Waarom />
                <Realisaties />
                <Testimonials />
                <Proces />
                <Showroom />
                <Offerte />
            </main>
            <Footer />
        </div>
    );
}
