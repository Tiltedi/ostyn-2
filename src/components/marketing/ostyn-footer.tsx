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

export const OstynFooter = () => {
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
