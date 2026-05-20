"use client";

import { useEffect, useRef, useState, type FC, type ReactNode } from "react";
import {
    ArrowLeft,
    ArrowRight,
    ArrowUpRight,
    Calendar,
    Check,
    ChevronDown,
    Mail01,
    MarkerPin01,
    Menu01,
    Phone,
    Plus,
    Send01,
} from "@untitledui/icons";
import { Carousel } from "@/components/application/carousel/carousel-base";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { SectionDivider } from "@/components/shared-assets/section-divider";
import { cx } from "@/utils/cx";

const productNav = [
    { label: "tuinhuis", href: "/tuinhuis", active: true },
    { label: "carport", href: "#" },
    { label: "garage", href: "#" },
    { label: "poolhouse", href: "/" },
    { label: "veranda", href: "#" },
    { label: "pergola", href: "#" },
    { label: "realisaties", href: "#realisaties" },
];

const OstynLogo = ({ className }: { className?: string }) => (
    <img
        src="/logo-ostyn.png"
        alt="Ostyn"
        className={cx("h-11 w-auto transition-[height] duration-300 ease-out md:h-14", className)}
    />
);

const OstynHeader = () => {
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
                            {productNav.map((item) => (
                                <li key={item.label}>
                                    <a
                                        href={item.href}
                                        className={cx(
                                            "text-md text-black outline-focus-ring transition hover:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2",
                                            item.active && "font-bold",
                                        )}
                                        aria-current={item.active ? "page" : undefined}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
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

const HeroSection = () => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const img = imgRef.current;
        if (!canvas || !img) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let ticking = false;
        const update = () => {
            const rect = canvas.getBoundingClientRect();
            if (rect.bottom > 0 && rect.top < window.innerHeight) {
                img.style.transform = `translate3d(0, ${(-rect.top * 0.3).toFixed(1)}px, 0)`;
            }
            ticking = false;
        };
        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    return (
        <section className="p-4 md:p-6 lg:p-8" aria-labelledby="hero-titel">
            <div
                ref={canvasRef}
                className="relative isolate flex min-h-[calc(100svh-4rem-2rem)] flex-col justify-end overflow-hidden rounded-3xl md:min-h-[calc(100svh-5rem-3rem)] lg:min-h-[calc(100svh-5rem-4rem)]"
            >
                <img
                    ref={imgRef}
                    src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=2400&h=1600&fit=crop&q=80"
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-x-0 -top-[20%] -z-10 h-[140%] w-full object-cover will-change-transform"
                />
                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-gradient-to-t from-black/30 via-black/5 to-transparent"
                />

                <div className="flex p-4 md:p-6">
                    <div className="flex flex-col gap-6 rounded-3xl bg-black/55 p-6 backdrop-blur-2xl backdrop-saturate-150 md:max-w-xl md:gap-8 md:p-8">
                        <div>
                            <p className="text-sm font-semibold tracking-[0.18em] text-[#C19848] uppercase md:text-md">
                                expand your freedom
                            </p>
                            <h1
                                id="hero-titel"
                                className="mt-3 text-display-sm font-medium text-balance text-white md:text-display-md"
                            >
                                Een <strong className="font-extrabold">tuinhuis op maat</strong>. In{" "}
                                <strong className="font-extrabold">eigen atelier</strong> gebouwd.
                            </h1>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <a
                                href="#realisaties"
                                aria-label="Bekijk onze realisaties"
                                className="group flex shrink-0 gap-2 outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-4"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=400&h=400&fit=crop&q=80"
                                    alt=""
                                    aria-hidden="true"
                                    className="size-12 shrink-0 rounded-2xl object-cover ring-1 ring-white/15 transition group-hover:scale-[1.05]"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1564540583246-934409427776?w=400&h=400&fit=crop&q=80"
                                    alt=""
                                    aria-hidden="true"
                                    className="size-12 shrink-0 rounded-2xl object-cover ring-1 ring-white/15 transition group-hover:scale-[1.05]"
                                />
                            </a>
                            <Button
                                href="#realisaties"
                                size="md"
                                iconTrailing={ArrowUpRight}
                                className="!bg-white !text-black hover:!bg-white/90 *:data-icon:!text-black/60 hover:*:data-icon:!text-black/80"
                            >
                                Onze realisaties
                            </Button>
                            <Button href="#offerte" size="md" iconTrailing={ArrowRight}>
                                Vraag uw offerte
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

type Promise = { title: string; body: string };
const promises: Promise[] = [
    {
        title: "3D-ontwerp en offerte vooraf",
        body: "U ziet en weet wat u koopt, voor u tekent. Geen meerwerk halverwege.",
    },
    {
        title: "Productie en plaatsing in één hand",
        body: "Onze eigen vaklui, in ons atelier in Dottenijs. Geen onderaanneming, geen tussenpartij.",
    },
    {
        title: "Nazorg door ons SAV-team",
        body: "Bereikbaar, ook lang na de oplevering. Geen externe hotline.",
    },
];

const PromiseSection = () => {
    return (
        <section className="bg-[#F2F2F2] py-16 md:py-24" aria-labelledby="belofte-titel">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
                    <p className="text-sm font-semibold tracking-wider text-black uppercase md:text-md">Wat u krijgt</p>
                    <h2
                        id="belofte-titel"
                        className="mt-3 text-display-sm font-medium text-balance text-black md:text-display-md"
                    >
                        Een <strong className="font-extrabold">premium</strong> tuinhuis, op <strong className="font-extrabold">maat</strong> van uw tuin ontworpen en in <strong className="font-extrabold">eigen atelier</strong> gebouwd.
                    </h2>
                    <p className="mt-4 text-lg text-black md:mt-5">
                        Geen catalogusmodel uit een doos. Geen ontwerper die naar een uitvoerder doorverwijst. Eén team, één
                        prijsafspraak, één verantwoordelijke partner — ook jaren na de plaatsing.
                    </p>
                </div>

                <ul className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3 md:gap-8">
                    {promises.map((item) => (
                        <li key={item.title} className="flex flex-col items-start rounded-2xl bg-white p-8 md:p-10">
                            <span aria-hidden="true" className="block h-0.5 w-10 bg-[#C19848]" />
                            <h3 className="mt-8 text-xl font-semibold text-black md:text-display-xs">{item.title}</h3>
                            <p className="mt-3 text-md text-black/70">{item.body}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

type Project = {
    id: string;
    title: string;
    subtitle: string;
    image: string;
    tag: string;
};

const projects: Project[] = [
    {
        id: "p1",
        title: "Tuinatelier met daglicht",
        subtitle: "Afrormosia hardhout, hoge schuifpartijen, plat dak met lichtkoepel.",
        image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=900&h=1200&fit=crop&q=80",
        tag: "Atelier",
    },
    {
        id: "p2",
        title: "Klassiek silhouet",
        subtitle: "Trespa-panelen, zadeldak, geïntegreerde berging voor tuinmateriaal.",
        image: "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f?w=900&h=1200&fit=crop&q=80",
        tag: "Klassiek",
    },
    {
        id: "p3",
        title: "Open tuinkamer",
        subtitle: "Overdekt terras met loungezone en geïntegreerde buitenkeuken.",
        image: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=900&h=1200&fit=crop&q=80",
        tag: "Tuinkamer",
    },
    {
        id: "p4",
        title: "Compact stadstuinhuis",
        subtitle: "Aluminium accenten, vlakke gevel, fiets- en tuingereiberging.",
        image: "https://images.unsplash.com/photo-1564540583246-934409427776?w=900&h=1200&fit=crop&q=80",
        tag: "Compact",
    },
    {
        id: "p5",
        title: "Hout en pleisterwerk",
        subtitle: "Hybride stijl die aansluit bij een klassieke villa.",
        image: "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=900&h=1200&fit=crop&q=80",
        tag: "Hybride",
    },
    {
        id: "p6",
        title: "Tuinkantoor",
        subtitle: "Volwaardig geïsoleerde werkruimte met aparte ingang en akoestiek.",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=900&h=1200&fit=crop&q=80",
        tag: "Werkruimte",
    },
];

const RoundButton = ({
    icon: Icon,
    className,
    ...props
}: {
    icon: FC<{ className?: string }>;
    className?: string;
    "aria-label"?: string;
}) => (
    <Button
        {...props}
        color="link-gray"
        className={cx(
            "group flex size-12 items-center justify-center rounded-full bg-white ring-1 ring-black/15 backdrop-blur transition duration-100 ease-linear ring-inset hover:bg-[#F2F2F2] md:size-14",
            className,
        )}
    >
        <Icon className="size-5 text-black transition-inherit-all md:size-6" />
    </Button>
);

const RealisatiesSection = () => {
    return (
        <section
            id="realisaties"
            className="overflow-hidden bg-white py-16 md:py-24"
            aria-labelledby="realisaties-titel"
        >
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end lg:gap-12">
                    <div className="flex max-w-3xl flex-col gap-4">
                        <p className="text-sm font-semibold tracking-wider text-black uppercase md:text-md">Realisaties</p>
                        <h2 id="realisaties-titel" className="text-display-sm font-medium text-balance text-black md:text-display-md">
                            Elk tuinhuis ontworpen op <strong className="font-extrabold">maat</strong> van de woning.
                        </h2>
                        <p className="text-lg text-black">
                            Een greep uit onze recent gerealiseerde tuinhuizen — atelier, tuinkamer, berging, kantoor of een
                            combinatie ervan.
                        </p>
                    </div>

                    <Button href="#offerte" size="xl" iconTrailing={ArrowRight} className="self-start lg:self-end">
                        Vraag uw gratis offerte aan
                    </Button>
                </div>

                <Carousel.Root className="mt-12 md:mt-16" opts={{ align: "start" }}>
                    <Carousel.Content overflowHidden={false} className="gap-6 pr-4 md:gap-8 md:pr-8">
                        {projects.map((project) => (
                            <Carousel.Item
                                key={project.id}
                                className="group relative flex h-118 max-w-76 shrink-0 cursor-grab items-end overflow-hidden rounded-2xl bg-[#F2F2F2] md:h-126 md:w-full md:max-w-sm"
                            >
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                                <div className="relative flex w-full flex-col gap-3 p-6 md:p-8">
                                    <span className="self-start rounded-full bg-[#C19848] px-3 py-1 text-xs font-semibold text-white">
                                        {project.tag}
                                    </span>
                                    <p className="text-display-xs font-semibold text-white md:text-display-sm">{project.title}</p>
                                    <p className="text-md text-white/90">{project.subtitle}</p>
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel.Content>

                    <div className="mt-8 flex gap-4 md:gap-8">
                        <Carousel.PrevTrigger asChild>
                            <RoundButton icon={ArrowLeft} aria-label="Vorige realisatie" />
                        </Carousel.PrevTrigger>
                        <Carousel.NextTrigger asChild>
                            <RoundButton icon={ArrowRight} aria-label="Volgende realisatie" />
                        </Carousel.NextTrigger>
                    </div>
                </Carousel.Root>
            </div>
        </section>
    );
};

type Pillar = { figure: string; eyebrow: string; title: string; body: ReactNode };
const pillars: Pillar[] = [
    {
        figure: "1992",
        eyebrow: "Sinds 1992",
        title: "33 jaar familiebedrijf",
        body: (
            <>
                <p>
                    Ostyn is sinds <strong className="font-semibold">1992</strong> een familiebedrijf, opgericht door{" "}
                    <strong className="font-semibold">Yvan Ostyn</strong> en vandaag voortgezet door zijn zonen{" "}
                    <strong className="font-semibold">Thomas</strong> en <strong className="font-semibold">Laurens</strong>. Sinds 2023
                    brengen we <strong className="font-semibold">Veranclassic</strong> en <strong className="font-semibold">Poolhouse Plaza</strong>{" "}
                    samen onder één naam.
                </p>
                <p className="mt-3 text-sm italic text-black/70 md:text-md">
                    &ldquo;Alles blijft hetzelfde, behalve de naam.&rdquo;
                </p>
            </>
        ),
    },
    {
        figure: "100%",
        eyebrow: "Niets uitbesteed",
        title: "Eigen atelier",
        body: (
            <p>
                Elk tuinhuis wordt door <strong className="font-semibold">onze eigen vaklui</strong> gebouwd in ons atelier in{" "}
                <strong className="font-semibold">Dottenijs</strong>. Geen onderaanneming, geen tussenpartij. Eén keten van
                verantwoordelijkheid — van eerste schets tot laatste schroef.
            </p>
        ),
    },
    {
        figure: "3.000 m²",
        eyebrow: "Open 7/7",
        title: "Grootste showroom in België",
        body: (
            <p>
                De <strong className="font-semibold">grootste overdekte showroom</strong> voor tuinconstructies in België en
                Noord-Frankrijk. <strong className="font-semibold">Zeven dagen op zeven</strong> open — ook tijdens weekends en
                feestdagen. Materialen bekijkt u op ware grootte, naast elkaar.
            </p>
        ),
    },
];

const WaaromSection = () => {
    return (
        <section id="waarom" className="bg-[#F2F2F2] py-16 md:py-24" aria-labelledby="waarom-titel">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="flex max-w-3xl flex-col gap-4 md:gap-5">
                    <p className="text-sm font-semibold tracking-wider text-black uppercase md:text-md">Waarom Ostyn</p>
                    <h2 id="waarom-titel" className="text-display-sm font-medium text-balance text-black md:text-display-md">
                        Drie redenen waarom <strong className="font-extrabold">tuinliefhebbers</strong> voor ons kiezen.
                    </h2>
                </div>

                <ul className="mt-12 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3 md:gap-8">
                    {pillars.map((p) => (
                        <li
                            key={p.title}
                            className="flex flex-col rounded-2xl bg-white p-8 md:p-10"
                        >
                            <p className="text-display-md font-extrabold tracking-tight text-black md:text-display-lg">
                                {p.figure}
                            </p>
                            <div className="mt-8 border-t border-black/10 pt-6">
                                <p className="text-xs font-semibold tracking-wider text-black uppercase">{p.eyebrow}</p>
                                <h3 className="mt-2 text-xl font-semibold text-black md:text-display-xs">{p.title}</h3>
                            </div>
                            <div className="mt-4 text-md text-black/70">{p.body}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

type Step = { num: string; title: string; body: string };
const steps: Step[] = [
    {
        num: "01",
        title: "Adviesgesprek",
        body: "In onze showroom in Dottenijs of bij u thuis. We luisteren, kijken naar uw tuin en geven concreet advies — zonder verkoopdruk.",
    },
    {
        num: "02",
        title: "3D-ontwerp en offerte op maat",
        body: "U ziet uw tuinhuis in 3D vóór u tekent. De offerte is gedetailleerd en transparant. Wat we afspreken, blijft staan — geen meerwerk dat halverwege opduikt.",
    },
    {
        num: "03",
        title: "Productie in eigen atelier",
        body: "Uw tuinhuis wordt door onze vaklui in Dottenijs gebouwd. Geen onderaanneming betekent: geen verborgen kosten en geen verschuiven van verantwoordelijkheid.",
    },
    {
        num: "04",
        title: "Plaatsing door Ostyn-teams",
        body: "Onze eigen monteurs leveren en plaatsen. Eén ploeg op uw terrein, één aanspreekpunt voor de planning.",
    },
    {
        num: "05",
        title: "Klantenportaal en oplevering",
        body: "U volgt uw project online via het Ostyn-klantenportaal. Bij oplevering overlopen we elk detail samen.",
    },
];

const ProcesSection = () => {
    return (
        <section id="proces" className="bg-white py-16 md:py-24" aria-labelledby="proces-titel">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="flex max-w-3xl flex-col gap-4 md:gap-5">
                    <p className="text-sm font-semibold tracking-wider text-black uppercase md:text-md">Hoe werkt het</p>
                    <h2 id="proces-titel" className="text-display-sm font-medium text-balance text-black md:text-display-md">
                        Van eerste gesprek tot oplevering — <strong className="font-extrabold">zonder verrassingen</strong>.
                    </h2>
                    <p className="text-lg text-black">
                        U weet vooraf hoe uw tuinhuis eruit ziet, wat het kost, en wanneer het klaar is. De afgesproken prijs
                        houdt stand.
                    </p>
                </div>

                <ol className="mt-12 grid grid-cols-1 gap-10 md:mt-16 md:gap-12 lg:grid-cols-5 lg:gap-8">
                    {steps.map((step) => (
                        <li key={step.num} className="flex flex-col gap-4 lg:gap-6">
                            <span
                                aria-hidden="true"
                                className="text-display-lg font-bold leading-[0.85] text-transparent [-webkit-text-stroke:1.5px_#C19848] md:text-display-xl"
                            >
                                {step.num}
                            </span>
                            <div>
                                <h3 className="text-xl font-semibold text-black md:text-display-xs">
                                    <span className="sr-only">Stap {step.num}: </span>
                                    {step.title}
                                </h3>
                                <p className="mt-2 text-md text-black">{step.body}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    );
};

type Testimonial = {
    id: string;
    title: string;
    quote: string;
    author: string;
    project: string;
    avatar: string;
};

const testimonials: Testimonial[] = [
    {
        id: "t-devos",
        title: "Een dikke pluim aan al uw medewerkers",
        quote: "Naar aanleiding van de aankoop van een tuinhuis bij uw bedrijf, zouden wij toch een dikke pluim willen geven aan al uw medewerkers!",
        author: "Familie Devos",
        project: "Tuinhuis · 2024",
        avatar: "https://www.untitledui.com/images/avatars/nikolas-gibbons?fm=webp&q=80",
    },
    {
        id: "t-palsterman",
        title: "Zelden zulke gedreven vaklui gezien",
        quote: "Ik heb zelden zulke bekwame, gedreven en vriendelijke vaklui aan het werk gezien!",
        author: "Mr. Palsterman",
        project: "Tuinhuis · 2023",
        avatar: "https://www.untitledui.com/images/avatars/marco-kelly?fm=webp&q=80",
    },
    {
        id: "t-vandeputte",
        title: "Onze tuin oogt nu als een vakantieresort",
        quote: "De Afrormosia hardhout veroudert prachtig. Onze tuin oogt nu als een vakantieresort, en de buren komen het regelmatig bewonderen.",
        author: "Familie Vandeputte",
        project: "Tuinhuis · 2023",
        avatar: "https://www.untitledui.com/images/avatars/owen-garcia?fm=webp&q=80",
    },
    {
        id: "t-vermeulen",
        title: "Het 3D-ontwerp gaf ons vertrouwen",
        quote: "Het 3D-ontwerp gaf ons echt vertrouwen om de stap te zetten. Het resultaat ziet er nog mooier uit dan op de tekening.",
        author: "Familie Vermeulen",
        project: "Tuinhuis · 2024",
        avatar: "https://www.untitledui.com/images/avatars/ammar-foley?fm=webp&q=80",
    },
    {
        id: "t-debacker",
        title: "Eén aanspreekpunt van begin tot eind",
        quote: "Geen enkele keer moest ik bellen voor een update — zij belden mij. Dat scheelt rust en planning thuis enorm.",
        author: "Mevr. De Backer",
        project: "Pergola · 2024",
        avatar: "https://www.untitledui.com/images/avatars/florence-shaw?fm=webp&q=80",
    },
    {
        id: "t-lechantre",
        title: "We hadden gelijk om hen te vertrouwen",
        quote: "We hadden gelijk om jullie bedrijf te vertrouwen. Het werk werd correct, op tijd en met zorg afgewerkt.",
        author: "Mr. & Mevr. Lechantre",
        project: "Carport · 2023",
        avatar: "https://www.untitledui.com/images/avatars/zaid-schwartz?fm=webp&q=80",
    },
    {
        id: "t-cornelis",
        title: "De offerte klopte tot op de euro",
        quote: "We dachten dat een tuinhuis op maat onbetaalbaar zou zijn. Bij Ostyn klopte de offerte tot op de euro — geen verrassingen achteraf.",
        author: "Familie Cornelis",
        project: "Tuinhuis · 2023",
        avatar: "https://www.untitledui.com/images/avatars/mathilde-lewis?fm=webp&q=80",
    },
    {
        id: "t-janssens",
        title: "Strakke planning, indrukwekkend nageleefd",
        quote: "Drie maanden van schets tot oplevering. Indrukwekkend hoe strak de planning werd nageleefd, ook bij de afwerking.",
        author: "Mr. Janssens",
        project: "Veranda · 2024",
        avatar: "https://www.untitledui.com/images/avatars/stefan-sears?fm=webp&q=80",
    },
    {
        id: "t-verhoeven",
        title: "Nazorg waar zij het initiatief nemen",
        quote: "Het SAV-team belde uit zichzelf na een half jaar om alles na te kijken. Dat zegt veel over hoe ze nazorg invullen.",
        author: "Mevr. Verhoeven",
        project: "Tuinhuis · 2022",
        avatar: "https://www.untitledui.com/images/avatars/harriet-rojas?fm=webp&q=80",
    },
];

const testimonialRows: Testimonial[][] = [testimonials.slice(0, 5), testimonials.slice(5)];

const QuoteGlyph = ({ className }: { className?: string }) => (
    <svg aria-hidden="true" viewBox="0 0 32 24" className={className}>
        <path
            fill="currentColor"
            d="M9.5 24c-2.6 0-4.7-.8-6.4-2.5C1.4 19.7.5 17.5.5 14.8c0-4.5 1.9-8.6 5.7-12.4L8 0l3.5 2.7c-1.6 1.6-3 3.1-4.1 4.5-1.1 1.4-1.7 2.7-1.8 3.9 1.3-.2 2.4 0 3.5.6 1 .6 1.8 1.4 2.3 2.4.6 1.1.9 2.2.9 3.4 0 1.9-.6 3.4-1.9 4.6S11.2 24 9.5 24Zm15 0c-2.6 0-4.7-.8-6.4-2.5-1.7-1.7-2.5-4-2.5-6.7 0-4.5 1.9-8.6 5.7-12.4L23 0l3.5 2.7c-1.6 1.6-3 3.1-4.1 4.5-1.1 1.4-1.7 2.7-1.8 3.9 1.3-.2 2.4 0 3.4.6 1.1.6 1.9 1.4 2.4 2.4.6 1.1.9 2.2.9 3.4 0 1.9-.6 3.4-1.9 4.6S26.3 24 24.5 24Z"
        />
    </svg>
);

const TestimonialCard = ({ t }: { t: Testimonial }) => (
    <figure className="flex w-[280px] shrink-0 flex-col gap-5 rounded-2xl bg-white p-6 shadow-lg sm:w-[340px] md:w-[380px] md:p-7">
        <h3 className="text-lg font-semibold text-balance text-black md:text-xl">{t.title}</h3>
        <blockquote className="text-md text-black/70">{t.quote}</blockquote>
        <figcaption className="mt-auto flex items-end justify-between gap-3 pt-2">
            <div className="flex items-center gap-3">
                <img
                    src={t.avatar}
                    alt=""
                    aria-hidden="true"
                    className="size-10 shrink-0 rounded-full object-cover ring-1 ring-black/5"
                />
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-black">{t.author}</span>
                    <span className="text-sm text-black/60">{t.project}</span>
                </div>
            </div>
            <QuoteGlyph className="size-7 shrink-0 text-black/15" />
        </figcaption>
    </figure>
);

const MarqueeRow = ({ items, reverse }: { items: Testimonial[]; reverse?: boolean }) => (
    <div className="group flex overflow-hidden">
        {[0, 1].map((i) => (
            <div
                key={i}
                aria-hidden={i === 1 ? "true" : undefined}
                className={cx(
                    "flex shrink-0 animate-marquee gap-5 pr-5 motion-reduce:animate-none md:gap-6 md:pr-6",
                    "group-hover:[animation-play-state:paused]",
                    reverse && "[animation-direction:reverse]",
                )}
            >
                {items.map((t) => (
                    <TestimonialCard key={`${i}-${t.id}`} t={t} />
                ))}
            </div>
        ))}
    </div>
);

const TestimonialsSection = () => {
    return (
        <section
            className="bg-white px-6 py-16 md:px-12 md:py-24 lg:px-16"
            aria-labelledby="getuigenissen-titel"
        >
            <div className="relative isolate flex flex-col overflow-hidden rounded-3xl">
                <img
                    src="/testimonials.jpg"
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 h-full w-full object-cover"
                />
                <div
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-gradient-to-b from-black/45 via-black/15 to-white"
                />

                <div className="px-6 pt-16 pb-12 md:px-12 md:pt-24 md:pb-16">
                    <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
                        <span className="rounded-full bg-white px-4 py-1.5 text-sm font-semibold tracking-wider text-black uppercase">
                            Getuigenissen
                        </span>
                        <h2
                            id="getuigenissen-titel"
                            className="mt-6 text-display-sm font-medium text-balance text-white md:text-display-md"
                        >
                            Wat onze <strong className="font-extrabold">klanten</strong>
                            <br className="hidden md:inline" /> over ons zeggen.
                        </h2>
                    </div>
                </div>

                <div className="flex flex-col gap-5 pb-16 md:gap-6 md:pb-24">
                    <MarqueeRow items={testimonialRows[0]} />
                    <MarqueeRow items={testimonialRows[1]} reverse />
                </div>
            </div>
        </section>
    );
};

type AftercareItem = { title: string; body: string };
const aftercareItems: AftercareItem[] = [
    {
        title: "Eigen SAV-team",
        body: "Service na verkoop intern georganiseerd. Geen externe hotline, geen ticketsysteem.",
    },
    {
        title: "Open garantie",
        body: "Onderhouds- en garantievoorwaarden op voorhand beschikbaar — niet in de kleine letters.",
    },
    {
        title: "Klantenportaal",
        body: "Blijft toegankelijk, ook jaren na de oplevering — voor planning, documenten en onderhoud.",
    },
    {
        title: "Familiebedrijf sinds 1992",
        body: "De namen op de offerte zijn de namen die u nadien terugvindt.",
    },
];

const NazorgSection = () => {
    return (
        <section className="bg-white py-16 md:py-24" aria-labelledby="nazorg-titel">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
                    <div className="flex max-w-2xl flex-col gap-4 md:gap-5">
                        <p className="text-sm font-semibold tracking-wider text-black uppercase md:text-md">Nazorg</p>
                        <h2
                            id="nazorg-titel"
                            className="text-display-sm font-medium text-balance text-black md:text-display-md"
                        >
                            Ons werk stopt <strong className="font-extrabold">niet</strong> bij de oplevering.
                        </h2>
                        <p className="text-lg text-black">
                            Een tuinhuis is een investering voor decennia. U mag verwachten dat de partner die hem bouwt, er ook
                            over tien jaar nog is.
                        </p>
                        <p className="mt-2 text-md text-black/70">
                            Eerlijk gezegd: premium materialen zoals Afrormosia hardhout en Trespa zijn duurzaam, maar vragen
                            onderhoud. We zijn daar open over en bezorgen u onze onderhoudsgids bij de oplevering.
                        </p>
                    </div>

                    <ul className="flex flex-col border-t border-black/10">
                        {aftercareItems.map((item) => (
                            <li key={item.title} className="border-b border-black/10 py-6">
                                <p className="text-lg font-semibold text-black md:text-xl">{item.title}</p>
                                <p className="mt-2 text-md text-black/70">{item.body}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

const ShowroomSection = () => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const img = imgRef.current;
        if (!canvas || !img) return;

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let ticking = false;
        const update = () => {
            const rect = canvas.getBoundingClientRect();
            if (rect.bottom > 0 && rect.top < window.innerHeight) {
                img.style.transform = `translate3d(0, ${(-rect.top * 0.15).toFixed(1)}px, 0)`;
            }
            ticking = false;
        };
        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    return (
        <section id="showroom" className="bg-[#C19848] py-16 md:py-24" aria-labelledby="showroom-titel">
            <div className="mx-auto grid max-w-container grid-cols-1 gap-12 px-4 md:px-8 lg:grid-cols-2 lg:items-center lg:gap-16">
                <div className="flex flex-col">
                    <p className="text-sm font-semibold tracking-wider text-white uppercase md:text-md">Showroom</p>
                    <h2 id="showroom-titel" className="mt-3 text-display-sm font-medium text-balance text-white md:text-display-md">
                        Kom langs in <strong className="font-extrabold">Dottenijs</strong>.
                    </h2>
                    <p className="mt-4 text-lg text-white md:mt-5">
                        <strong className="font-semibold">3.000 m² overdekt</strong>, zeven dagen op zeven open. Tuinhuizen,
                        veranda&apos;s, carports en tuinkamers op ware grootte. Materialen die u kunt voelen — Afrormosia, Trespa,
                        Aquapanel.
                    </p>
                    <ul className="mt-8 flex flex-col gap-4 text-md text-white">
                        <li className="flex items-start gap-3">
                            <MarkerPin01 className="mt-0.5 size-5 shrink-0 text-white" />
                            <span>Engelse Wandeling 2, 7711 Dottenijs (Mouscron)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Calendar className="mt-0.5 size-5 shrink-0 text-white" />
                            <span>7 dagen op 7 open — ook tijdens weekends en feestdagen</span>
                        </li>
                    </ul>
                    <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row">
                        <Button href="#inspiratieboek" color="secondary" size="xl" iconTrailing={ArrowUpRight}>
                            Download het inspiratieboek
                        </Button>
                        <Button href="#offerte" size="xl" iconTrailing={ArrowRight} className="!bg-black !text-white hover:!bg-black/85">
                            Vraag uw offerte aan
                        </Button>
                    </div>
                </div>

                <div ref={canvasRef} className="relative aspect-square overflow-hidden rounded-2xl">
                    <img
                        ref={imgRef}
                        src="/showroom.jpg"
                        alt="Adviesgesprek in de Ostyn showroom in Dottenijs"
                        className="absolute inset-x-0 -top-[20%] h-[140%] w-full object-cover will-change-transform"
                    />
                </div>
            </div>
        </section>
    );
};

const OfferteSection = () => {
    return (
        <section id="offerte" className="bg-[#F2F2F2] py-16 md:py-24" aria-labelledby="cta-titel">
            <div className="mx-auto grid max-w-container grid-cols-1 gap-12 px-4 md:px-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
                <div className="flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start">
                    <p className="text-sm font-semibold tracking-wider text-black uppercase md:text-md">Offerte aanvragen</p>
                    <h2 id="cta-titel" className="text-display-sm font-medium text-balance text-black md:text-display-md">
                        Klaar om uw tuinhuis <strong className="font-extrabold">concreet</strong> te maken?
                    </h2>
                    <p className="text-lg text-black">
                        Vraag uw <strong className="font-semibold">gratis offerte</strong> aan voor uw tuinhuis. Vrijblijvend, zonder
                        verkoopdruk, met antwoord binnen 2 werkdagen.
                    </p>

                    <ul className="mt-4 flex flex-col gap-3 text-md text-black">
                        <li className="flex items-start gap-3">
                            <Check className="mt-0.5 size-5 shrink-0 text-[#C19848]" />
                            <span>Vrijblijvend, geen verkoopdruk</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Check className="mt-0.5 size-5 shrink-0 text-[#C19848]" />
                            <span>Antwoord binnen 2 werkdagen</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Check className="mt-0.5 size-5 shrink-0 text-[#C19848]" />
                            <span>Gratis 3D-ontwerp bij ondertekening</span>
                        </li>
                    </ul>

                    <div className="mt-6 flex flex-col gap-3 border-t border-black/10 pt-6 text-md text-black">
                        <a href="tel:+3256480480" className="flex items-center gap-3 hover:opacity-80">
                            <Phone className="size-5 text-[#C19848]" />
                            <span className="font-semibold">+32 56 48 04 80</span>
                        </a>
                        <a href="mailto:info@ostyn.be" className="flex items-center gap-3 hover:opacity-80">
                            <Mail01 className="size-5 text-[#C19848]" />
                            <span className="font-semibold">info@ostyn.be</span>
                        </a>
                    </div>
                </div>

                <form
                    action="#"
                    method="post"
                    className="flex flex-col gap-5 rounded-2xl bg-white p-6 md:p-8"
                >
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <Input label="Voornaam" name="voornaam" placeholder="Voornaam" autoComplete="given-name" isRequired />
                        <Input label="Naam" name="naam" placeholder="Naam" autoComplete="family-name" isRequired />
                    </div>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <Input label="E-mail" type="email" name="email" placeholder="u@voorbeeld.be" autoComplete="email" isRequired />
                        <Input label="Telefoon" type="tel" name="telefoon" placeholder="+32 …" autoComplete="tel" />
                    </div>
                    <Input
                        label="Postcode & gemeente"
                        name="locatie"
                        placeholder="bv. 8500 Kortrijk"
                        autoComplete="postal-code"
                    />
                    <TextArea
                        label="Vertel ons over uw project (optioneel)"
                        name="bericht"
                        placeholder="Bv. afmetingen, gewenste functies (atelier, berging, kantoor…), timing…"
                        rows={4}
                    />
                    <Checkbox
                        name="privacy"
                        isRequired
                        label={
                            <span className="text-sm text-black">
                                Ik ga akkoord met de verwerking van mijn gegevens volgens de{" "}
                                <a
                                    href="https://ostyn.be/privacy"
                                    target="_blank"
                                    rel="noopener"
                                    className="font-semibold text-black underline underline-offset-4"
                                >
                                    privacyverklaring
                                </a>
                                .
                            </span>
                        }
                    />
                    <Button type="submit" size="xl" iconTrailing={Send01} className="mt-2">
                        Vraag uw gratis offerte aan
                    </Button>
                    <p className="text-center text-sm text-black/70">
                        Vrijblijvend · Geen verkoopdruk · Antwoord binnen 2 werkdagen
                    </p>
                </form>
            </div>

            <p id="inspiratieboek" className="mx-auto mt-12 max-w-container px-4 text-center text-md text-black md:px-8">
                Liever eerst wat inspiratie?{" "}
                <a
                    href="https://ostyn.be/inspiratieboek"
                    target="_blank"
                    rel="noopener"
                    className="font-semibold text-black underline underline-offset-4"
                >
                    Download het inspiratieboek →
                </a>
            </p>
        </section>
    );
};

type FaqItem = { q: string; a: ReactNode };
const faqItems: FaqItem[] = [
    {
        q: "Hoe lang duurt een project van eerste gesprek tot oplevering?",
        a: (
            <>
                Reken gemiddeld op <strong className="font-semibold">2 tot 4 maanden</strong>, afhankelijk van complexiteit en
                planning. Na goedkeuring van het 3D-ontwerp en de definitieve offerte volgt 6 tot 10 weken productie in eigen
                atelier en plaatsing door onze eigen teams.
            </>
        ),
    },
    {
        q: "Hoe verloopt het ontwerpproces?",
        a: (
            <>
                Adviesgesprek → 3D-ontwerp → gedetailleerde offerte → productie in eigen atelier → plaatsing → oplevering. U ziet
                uw tuinhuis in 3D vóór u tekent en de afgesproken prijs houdt stand —{" "}
                <strong className="font-semibold">geen meerwerk halverwege</strong>.
            </>
        ),
    },
    {
        q: "Wat onderscheidt Ostyn van een tuinhuis uit de doos?",
        a: (
            <>
                Elk tuinhuis wordt op maat ontworpen voor uw tuin en woning — geen catalogusmodel waar u zelf aan moet
                schaven. Eigen ontwerp, eigen atelier in Dottenijs, eigen plaatsingsteams en een intern SAV-team.{" "}
                <strong className="font-semibold">Eén keten van verantwoordelijkheid</strong>, ook jaren na de oplevering.
            </>
        ),
    },
    {
        q: "Heb ik een vergunning nodig voor mijn tuinhuis?",
        a: (
            <>
                Dat hangt af van afmetingen, locatie en gemeente. Voor de meeste tuinhuizen is een{" "}
                <strong className="font-semibold">melding</strong> voldoende; voor grotere of bijzondere constructies een
                omgevingsvergunning. We loodsen u door het traject en bezorgen de bouwplannen voor uw dossier.
            </>
        ),
    },
    {
        q: "Komen jullie aan huis voor een adviesgesprek?",
        a: (
            <>
                Ja. We komen graag bij u langs om uw woning en tuin te zien. Een bezoek aan onze showroom in Dottenijs kan
                natuurlijk ook — 3.000 m² overdekt, zeven dagen op zeven open.
            </>
        ),
    },
    {
        q: "In welke regio's zijn jullie actief?",
        a: (
            <>
                Heel <strong className="font-semibold">België</strong> en <strong className="font-semibold">Noord-Frankrijk</strong>.
                Onze plaatsingsploegen vertrekken vanuit Dottenijs en zijn dagelijks op de baan.
            </>
        ),
    },
    {
        q: "Welke types projecten realiseren jullie?",
        a: (
            <>
                Tuinhuizen, poolhouses, carports, garages, veranda&apos;s, pergola&apos;s en aanverwante tuinconstructies. Telkens
                op maat ontworpen en in eigen atelier gebouwd.
            </>
        ),
    },
];

const FaqSection = () => {
    return (
        <section id="faq" className="bg-white py-16 md:py-24" aria-labelledby="faq-titel">
            <div className="mx-auto grid max-w-container grid-cols-1 gap-12 px-4 md:px-8 lg:grid-cols-2 lg:gap-16">
                <div className="flex flex-col">
                    <h2
                        id="faq-titel"
                        className="text-display-sm font-medium text-balance text-black md:text-display-md"
                    >
                        Hebt u <strong className="font-extrabold">vragen</strong>?
                    </h2>
                    <p className="mt-4 max-w-md text-lg text-black md:mt-5">
                        Van eerste adviesgesprek tot oplevering — u wilt weten wat u kunt verwachten. Hier vindt u alles wat u over
                        werken met Ostyn moet weten.
                    </p>

                    <div className="mt-10 aspect-[4/5] w-full max-w-[280px] overflow-hidden rounded-2xl bg-[#F2F2F2]">
                        <img
                            src="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=600&h=750&fit=crop&q=80"
                            alt="Adviseur Ostyn"
                            className="size-full object-cover"
                        />
                    </div>
                </div>

                <ul className="flex flex-col border-t border-black/10">
                    {faqItems.map((item) => (
                        <li key={item.q} className="border-b border-black/10">
                            <details className="group">
                                <summary className="flex cursor-pointer list-none items-center gap-4 py-6 outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2 [&::-webkit-details-marker]:hidden">
                                    <Plus
                                        aria-hidden="true"
                                        className="size-5 shrink-0 text-black transition-transform duration-200 ease-out group-open:rotate-45"
                                    />
                                    <span className="text-lg font-semibold text-black md:text-xl">{item.q}</span>
                                </summary>
                                <div className="pb-6 pl-9 text-md text-black/70">{item.a}</div>
                            </details>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

const footerCols = [
    {
        label: "Showroom",
        items: [
            { label: "Engelse Wandeling 2", href: null },
            { label: "7711 Dottenijs (Mouscron)", href: null },
            { label: "7 dagen op 7 open", href: null },
        ],
    },
    {
        label: "Contact",
        items: [
            { label: "+32 56 48 04 80", href: "tel:+3256480480" },
            { label: "info@ostyn.be", href: "mailto:info@ostyn.be" },
        ],
    },
    {
        label: "Juridisch",
        items: [
            { label: "Privacybeleid", href: "https://ostyn.be/privacy" },
            { label: "Cookiebeleid", href: "https://ostyn.be/cookies" },
            { label: "Algemene voorwaarden", href: "https://ostyn.be/algemene-voorwaarden" },
        ],
    },
];

const OstynFooter = () => {
    return (
        <footer className="bg-white py-12 md:pt-16 md:pb-12">
            <div className="mx-auto max-w-container px-4 md:px-8">
                <div className="grid grid-cols-1 gap-12 border-t border-black/10 pt-12 md:grid-cols-2 lg:grid-cols-4">
                    <div className="flex flex-col gap-4">
                        <img src="/logo-ostyn.png" alt="Ostyn" className="h-10 w-auto self-start" />
                        <p className="max-w-xs text-md text-black">
                            Specialist in tuinconstructies, woonuitbreidingen en poolhouses. Sinds 1992.
                        </p>
                    </div>
                    {footerCols.map((col) => (
                        <div key={col.label} className="flex flex-col gap-4">
                            <h4 className="text-sm font-semibold tracking-wider text-black uppercase">{col.label}</h4>
                            <ul className="flex flex-col gap-2">
                                {col.items.map((item) => (
                                    <li key={item.label} className="text-md text-black">
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                target={item.href.startsWith("http") ? "_blank" : undefined}
                                                rel={item.href.startsWith("http") ? "noopener" : undefined}
                                                className="hover:opacity-70"
                                            >
                                                {item.label}
                                            </a>
                                        ) : (
                                            item.label
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex flex-col justify-between gap-4 border-t border-black/10 pt-8 md:flex-row md:items-center">
                    <p className="text-sm text-black/70">
                        © {new Date().getFullYear()} Ostyn — voorheen Veranclassic &amp; Poolhouse Plaza.
                    </p>
                    <div className="flex gap-4 text-sm text-black/70">
                        <a href="#realisaties" className="hover:text-black">
                            Realisaties
                        </a>
                        <a href="#waarom" className="hover:text-black">
                            Waarom Ostyn
                        </a>
                        <a href="#proces" className="hover:text-black">
                            Proces
                        </a>
                        <a href="#showroom" className="hover:text-black">
                            Showroom
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const LandingPageTuinhuis = () => {
    return (
        <div className="bg-white">
            <OstynHeader />
            <main id="hoofdinhoud">
                <HeroSection />
                <PromiseSection />
                <SectionDivider />
                <RealisatiesSection />
                <SectionDivider />
                <WaaromSection />
                <ProcesSection />
                <ShowroomSection />
                <TestimonialsSection />
                <NazorgSection />
                <OfferteSection />
                <FaqSection />
            </main>
            <OstynFooter />
        </div>
    );
};

export default LandingPageTuinhuis;
