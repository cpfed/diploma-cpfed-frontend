import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import scheduleData from "./schedule.json";
import styles from "./KCPC2026.module.scss";

type StandalonePage = NextPage & {
    noLayout?: boolean;
};

type Locale = "ru" | "kz";

type LocalizedCopy = {
    metaTitle: string;
    metaDescription: string;
    eyebrow: string;
    scheduleTitle: string;
    languageLabel: string;
    locationLabel: string;
};

type LocalizedDay = {
    title: string;
    weekday: string;
    dateLabel: string;
};

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

type ScheduleDay = {
    id: string;
    sourceRow: number;
    date: string;
    ru: LocalizedDay;
    kz: LocalizedDay;
    items: ScheduleItem[];
};

type ScheduleData = {
    copy: Record<Locale, LocalizedCopy>;
    eventName: string;
    days: ScheduleDay[];
};

const data = scheduleData as ScheduleData;

const getItemTime = (time: ScheduleItem["time"], locale: Locale) => {
    return typeof time === "string" ? time : time[locale];
};

const KCPC2026: StandalonePage = () => {
    const router = useRouter();
    const locale: Locale = router.locale === "ru" ? "ru" : "kz";
    const copy = data.copy[locale];

    return (
        <>
            <Head>
                <title>{copy.metaTitle}</title>
                <meta name="description" content={copy.metaDescription} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <main className={styles.page}>
                <section className={styles.hero} aria-labelledby="kcpc-title">
                    <div className={styles.heroGrid} aria-hidden="true" />

                    <div className={styles.topbar}>
                        <Image
                            src="/images/events/KCPC2026/kcpc.svg"
                            className={styles.logo}
                            alt="KCPC"
                            width={300}
                            height={37}
                            priority
                        />

                        <nav
                            className={styles.localeSwitch}
                            aria-label={copy.languageLabel}
                        >
                            {(["kz", "ru"] as Locale[]).map((nextLocale) => (
                                <Link
                                    key={nextLocale}
                                    href={router.asPath}
                                    locale={nextLocale}
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
                        <p className={styles.eyebrow}>{copy.eyebrow}</p>
                        <h1 id="kcpc-title" className={styles.title}>
                            {data.eventName}
                        </h1>
                    </div>
                </section>

                <section className={styles.scheduleSection} aria-labelledby="schedule-title">
                    <div className={styles.sectionHeader}>
                        <p className={styles.sectionKicker}>KCPC 2026</p>
                        <h2 id="schedule-title">{copy.scheduleTitle}</h2>
                    </div>

                    <div className={styles.days}>
                        {data.days.map((day, index) => {
                            const localizedDay = day[locale];

                            return (
                                <article
                                    key={day.id}
                                    className={styles.day}
                                    data-source-row={day.sourceRow}
                                >
                                    <div className={styles.dayHeader}>
                                        <span className={styles.dayNumber}>
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <div>
                                            <p className={styles.dayMeta}>
                                                {localizedDay.weekday} · {localizedDay.dateLabel}
                                            </p>
                                            <h3>{localizedDay.title}</h3>
                                        </div>
                                    </div>

                                    <ol className={styles.timeline}>
                                        {day.items.map((item) => {
                                            const localizedItem = item[locale];

                                            return (
                                                <li
                                                    key={item.sourceRow}
                                                    className={styles.timelineItem}
                                                    data-source-row={item.sourceRow}
                                                >
                                                    <time className={styles.time}>
                                                        {getItemTime(item.time, locale)}
                                                    </time>
                                                    <div className={styles.itemBody}>
                                                        <h4>{localizedItem.title}</h4>
                                                        <p>
                                                            <span>{copy.locationLabel}</span>
                                                            {localizedItem.location}
                                                        </p>
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ol>
                                </article>
                            );
                        })}
                    </div>
                </section>
            </main>
        </>
    );
};

KCPC2026.noLayout = true;

export default KCPC2026;
