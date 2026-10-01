import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import scheduleData from "./schedule.json";
import styles from "./AlgoBatyr2026.module.scss";

type StandalonePage = NextPage & { noLayout?: boolean };
type Locale = "ru" | "kz";

type LocalizedScheduleItem = {
    title: string;
    location: string;
};

type ScheduleItem = {
    sourceRow: number;
    time: string | Record<Locale, string>;
    ru: LocalizedScheduleItem;
    kz: LocalizedScheduleItem;
};

type LocalizedDay = {
    title: string;
    weekday: string;
    dateLabel: string;
};

type ScheduleData = {
    copy: Record<Locale, typeof scheduleData.copy.ru>;
    eventName: string;
    days: {
        id: string;
        sourceRow: number;
        date: string;
        ru: LocalizedDay;
        kz: LocalizedDay;
        items: ScheduleItem[];
    }[];
};

const data: ScheduleData = scheduleData;
const getItemTime = (time: ScheduleItem["time"], locale: Locale) =>
    typeof time === "string" ? time : time[locale];

const Arrow = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
);

const LocationPin = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
);

const AlgoBatyr2026: StandalonePage = () => {
    const router = useRouter();
    const locale: Locale = router.locale === "ru" ? "ru" : "kz";
    const copy = data.copy[locale];

    return (
        <>
            <Head>
                <title>{copy.metaTitle}</title>
                <meta name="description" content={copy.metaDescription} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="theme-color" content="#f7f5ef" />
            </Head>

            <main className={styles.page} lang={locale === "kz" ? "kk" : "ru"} id="top">
                <a className={styles.skipLink} href="#schedule">{copy.scheduleLink}</a>

                <section className={styles.hero} aria-labelledby="algobatyr-title">
                    <Image
                        src="/images/events/AlgoBatyr2026/algobatyr-background.png"
                        alt=""
                        fill
                        className={styles.heroBackground}
                        sizes="100vw"
                        priority
                    />
                    <div className={styles.topbar}>
                        <Image
                            src="/images/events/AlgoBatyr2026/algobatyr-logo-horizontal.svg"
                            alt="AlgoBatyr"
                            width={531}
                            height={75}
                            className={styles.headerLogo}
                            sizes="(max-width: 600px) 160px, 240px"
                            priority
                        />
                        <nav className={styles.localeSwitch} aria-label={copy.languageLabel}>
                            {(["kz", "ru"] as Locale[]).map((nextLocale) => (
                                <Link
                                    key={nextLocale}
                                    href={router.asPath}
                                    locale={nextLocale}
                                    hrefLang={nextLocale === "kz" ? "kk" : "ru"}
                                    lang={nextLocale === "kz" ? "kk" : "ru"}
                                    className={[
                                        styles.localeLink,
                                        locale === nextLocale ? styles.localeLinkActive : "",
                                    ].join(" ")}
                                    aria-current={locale === nextLocale ? "page" : undefined}
                                >
                                    {nextLocale.toUpperCase()}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    <div className={styles.heroContent}>
                        <h1 id="algobatyr-title" className={styles.heroTitle}>
                            <span className={styles.srOnly}>{data.eventName}</span>
                            <Image
                                src="/images/events/AlgoBatyr2026/algobatyr-logo-vertical.svg"
                                alt=""
                                width={356}
                                height={248}
                                className={styles.heroLogo}
                                sizes="(max-width: 600px) 42vw, (max-width: 1100px) 38vw, 480px"
                                priority
                            />
                        </h1>
                    </div>

                    <div className={styles.heroBottom}>
                        <p className={styles.eventDate}>
                            <span>{copy.dateLabel} 2026</span>
                            <span className={styles.city}><LocationPin />{copy.cityLabel}</span>
                        </p>
                        <a className={styles.scheduleLink} href="#schedule">
                            {copy.scheduleLink}
                            <span className={styles.arrowBox}><Arrow /></span>
                        </a>
                    </div>
                </section>

                <section id="schedule" className={styles.scheduleSection} aria-labelledby="schedule-title">
                    <div className={styles.sectionHeader}>
                        <div>
                            <p className={styles.sectionKicker}>{data.eventName}</p>
                            <h2 id="schedule-title">{copy.scheduleTitle}<span aria-hidden="true">.</span></h2>
                        </div>
                        <div className={styles.scheduleNavigation}>
                            <p className={styles.timeNote}>{copy.timeNote}</p>
                            <nav className={styles.dayLinks} aria-label={copy.scheduleNavLabel}>
                                {data.days.map((day) => (
                                    <a key={day.id} href={`#${day.id}`}>
                                        {day[locale].dateLabel}<Arrow />
                                    </a>
                                ))}
                            </nav>
                        </div>
                    </div>

                    <div className={styles.days}>
                        {data.days.map((day, index) => (
                            <article
                                key={day.id}
                                id={day.id}
                                className={styles.day}
                                aria-labelledby={`${day.id}-title`}
                                data-source-row={day.sourceRow}
                            >
                                <div className={styles.dayHeader}>
                                    <div className={styles.dayNumber}>
                                        <span>{copy.dayLabel}</span>
                                        <span>{String(index + 1).padStart(2, "0")}</span>
                                    </div>
                                    <div className={styles.dayHeading}>
                                        <p className={styles.weekday}>{day[locale].weekday}</p>
                                        <time className={styles.dayDate} dateTime={day.date}>{day[locale].dateLabel}</time>
                                        <h3 id={`${day.id}-title`}>{day[locale].title}</h3>
                                    </div>
                                    {index === 0 ? (
                                        <Image
                                            src="/images/events/AlgoBatyr2026/algobatyr-sticker.png"
                                            alt=""
                                            width={1684}
                                            height={1215}
                                            className={styles.scheduleSticker}
                                            sizes="(max-width: 600px) 56px, 160px"
                                        />
                                    ) : (
                                        <span className={styles.dayDecoration} aria-hidden="true">&gt;&gt;</span>
                                    )}
                                </div>

                                <ol className={styles.timeline}>
                                    {day.items.map((item) => (
                                        <li key={item.sourceRow} className={styles.timelineItem} data-source-row={item.sourceRow}>
                                            <span className={styles.time}>{getItemTime(item.time, locale)}</span>
                                            <div className={styles.itemBody}>
                                                <h4>{item[locale].title}</h4>
                                                <p className={styles.location}>
                                                    <LocationPin />
                                                    <span className={styles.srOnly}>{copy.locationLabel}: </span>
                                                    {item[locale].location}
                                                </p>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </article>
                        ))}
                    </div>
                </section>

                <footer className={styles.footer}>
                    <div className={styles.footerInner}>
                        <p>{data.eventName}</p>
                        <a href="#top">{copy.backToTop}<Arrow /></a>
                    </div>
                </footer>
            </main>
        </>
    );
};

AlgoBatyr2026.noLayout = true;

export default AlgoBatyr2026;
