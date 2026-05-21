"use client";

import { Download01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Input } from "@/components/base/input/input";
import { OstynFooter } from "@/components/marketing/ostyn-footer";
import { OstynHeader } from "@/components/marketing/ostyn-header";

const InspiratieboekPage = () => {
    return (
        <div className="flex min-h-svh flex-col bg-[#F2F2F2]">
            <OstynHeader />

            <main className="flex flex-1">
                <section
                    aria-labelledby="inspiratieboek-titel"
                    className="mx-auto flex w-full max-w-container items-center px-4 py-8 md:px-8 md:py-10 lg:py-12"
                >
                    <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
                        <div className="flex flex-col gap-4 lg:gap-5">
                            <p className="text-sm font-semibold tracking-wider text-black uppercase md:text-md">
                                Gratis inspiratieboek
                            </p>
                            <h1
                                id="inspiratieboek-titel"
                                className="text-display-sm font-medium text-balance text-black md:text-display-md"
                            >
                                Inspiratie voor uw tuinproject in <strong className="font-extrabold">één boek</strong>.
                            </h1>
                            <p className="text-md text-black md:text-lg">
                                Poolhouses, tuinhuizen, carports en veranda&apos;s — realisaties, materialen en details uit ruim{" "}
                                <strong className="font-semibold">30 jaar</strong> Ostyn. Vul uw gegevens in en u ontvangt het
                                inspiratieboek direct in uw mailbox.
                            </p>

                            <form
                                action="#"
                                method="post"
                                className="mt-2 flex flex-col gap-4 rounded-2xl bg-white p-5 md:p-6"
                            >
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <Input label="Naam" name="naam" placeholder="Uw naam" autoComplete="name" isRequired />
                                    <Input
                                        label="E-mail"
                                        type="email"
                                        name="email"
                                        placeholder="u@voorbeeld.be"
                                        autoComplete="email"
                                        isRequired
                                    />
                                </div>
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
                                <Button type="submit" size="xl" iconTrailing={Download01} className="mt-1">
                                    Download het inspiratieboek
                                </Button>
                            </form>
                        </div>

                        <div className="order-first flex items-center justify-center lg:order-none">
                            <img
                                src="/Inspiratieboek/inspiratiebrochure_ostyn_cover_extra_schaduw.1600x1600.png"
                                alt="Ostyn inspiratieboek — cover"
                                className="h-auto w-full max-w-[280px] object-contain md:max-w-sm lg:max-w-md"
                            />
                        </div>
                    </div>
                </section>
            </main>

            <OstynFooter />
        </div>
    );
};

export default InspiratieboekPage;
