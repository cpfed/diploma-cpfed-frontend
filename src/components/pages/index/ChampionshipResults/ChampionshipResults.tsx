import React, { FormEvent, useEffect, useState } from "react";

import Container from "@/components/ui/Container";
import classes from "./ChampionshipResults.module.scss";
import useTranslation from "next-translate/useTranslation";

import "@/utils/icons"
import { CurrentChampionshipResultsList, CurrentChampionshipResultsRequest } from "@/interfaces/championshipResults";
import { Region } from "@/interfaces/region";
import { API } from "@/api/cpdefAPI";
import toast from "@/utils/toast";
import Pagination from '@mui/material/Pagination';
import Button from '@mui/material/Button';

const ChampionshipResults = () => {
    const limitPerPage = 20;
    const { t } = useTranslation();
    const [championshipResultsList, setChampionshipResultsList] = useState<CurrentChampionshipResultsList>();
    const [selectedRegionId, setSelectedRegionId] = useState<number>(0);
    const [fullname, setFullname] = useState<string>("");
    const [regionList, setRegionList] = useState<Region[]>([]);
    const [isFilterHidden, setIsFilterHidden] = useState<boolean>(false);
    const [filter, setFilter] = useState<CurrentChampionshipResultsRequest>({ page: 1, limit: limitPerPage, region_id: null, fullname: "" });
    const [maxPages, setMaxPages] = useState<number>(0);

    const fetchChampionshipResults = () => {
        API.fetchChampionshipResults(filter)
            .then((res) => {
                setChampionshipResultsList(res);
                setMaxPages(Math.floor((res.count + limitPerPage - 1) / limitPerPage));
            })
            .catch((err) => {
                toast.error(t("common:error"))
            });
    }

    const fetchRegions = () => {
        API.fetchRegions()
            .then((res) => {
                setRegionList(res.results);
            })
            .catch((err) => {
                toast.error(t("common:error"))
            });
    }

    const handleSubmitFilter = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (selectedRegionId != 0) {
            filter.region_id = selectedRegionId;
        }
        if (fullname != "") {
            filter.fullname = fullname;
        }
        filter.page = 1;
        setFilter(filter);
        fetchChampionshipResults();
    }

    const handlePageChange = (newCurrPage: number) => {
        filter.page = newCurrPage;
        fetchChampionshipResults();
    }

    const handleFilterSwitch = () => {
        setIsFilterHidden(!isFilterHidden);
    }

    const resetFilter = () => {
        setSelectedRegionId(0);
        setFullname("");
        filter.region_id = 0;
        filter.fullname = "";
        fetchChampionshipResults();
    }

    // Function to normalize points array to ensure it has the same length for every participant
    const normalizePoints = (points: (number | null | undefined)[], maxContests: number): number[] => {
        const normalizedPoints = new Array(maxContests).fill(0);
        points.forEach((point, index) => {
            normalizedPoints[index] = point ?? 0; // Use the nullish coalescing operator to fall back to 0 if point is null or undefined
        });
        return normalizedPoints;
    };



    // Find out the max number of contests by checking the participant with the most contests
    const maxContests = championshipResultsList?.results.reduce((max, current) => Math.max(max, current.points.length), 0) ?? 0;

    useEffect(() => { fetchChampionshipResults() }, []);
    useEffect(() => { fetchRegions() }, []);

    return (
        <section className={classes.championshipResults} id="championshipResults">
            <Container>
                <div className={classes.mainContainer}>
                    <div className={classes.container}>
                        <p className={classes.title}>{t('championship-results:results')}</p>
                        <div className={classes.filterSwitcher} onClick={() => handleFilterSwitch()}>
                            <p className={classes.filterSwitcher_text}>{t('championship-results:set-filter')}</p>
                            <span className={classes.filterSwitcher_plus}>
                                &#43;
                            </span>
                        </div>
                        {isFilterHidden
                            ? <></>
                            : <>
                                <form className={classes.filter} onSubmit={handleSubmitFilter}>
                                    <div className={classes.filterConfiguration}>
                                        <div className={classes.filterElement}>
                                            <label
                                                className={classes.filterElement_text}>{t('championship-results:region')}</label>
                                            <select
                                                onChange={(e) => {
                                                    setSelectedRegionId(Number(e.target.value))
                                                }}
                                                className={classes.form__select}
                                                value={selectedRegionId}
                                            >
                                                <option
                                                    selected
                                                    value={0}
                                                >
                                                    {t('championship-results:not-selected')}
                                                </option>
                                                {
                                                    regionList.map((region, index, self) => {
                                                        return (
                                                            <option
                                                                key={index}
                                                                value={region.id}
                                                            >
                                                                {t("regions:" + region.name)}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>

                                        <div className={classes.filterElement}>
                                            <label
                                                className={classes.filterElement_text}>{t('championship-results:fio')}</label>
                                            <input
                                                className={classes.form__input}
                                                type="text"
                                                value={fullname}
                                                onChange={(event) =>
                                                    setFullname(event.currentTarget.value)
                                                }
                                            />
                                        </div>

                                    </div>

                                    <div className={classes.filterConfiguration}>
                                        <Button className={classes.filterApplyButton} type="submit" variant="contained"
                                                disableElevation>
                                            {t('championship-results:apply-filter')}
                                        </Button>
                                        <Button className={classes.filterApplyButton} onClick={resetFilter}
                                                variant="contained" disableElevation>
                                            {t('championship-results:reset-filter')}
                                        </Button>
                                    </div>
                                </form>
                            </>
                        }
                        <table className={classes.container__table}>
                            {championshipResultsList?.results?.map((championshipResults, index) => {
                                const normalizedPoints = normalizePoints(championshipResults.points, maxContests);
                                return (
                                    <>
                                        {index === 0 && (
                                            <tr>
                                                <td>{t('championship-results:rank')}</td>
                                                <td>{t('championship-results:fio')}</td>
                                                {normalizedPoints.map((_, index) => (
                                                    <td key={index}>{`${t('championship-results:contest-points-left-part')}${index + 1}${t('championship-results:contest-points-right-part')}`}</td>
                                                ))}
                                                <td>{t('championship-results:total-points')}</td>
                                                <td>{t('championship-results:region')}</td>
                                            </tr>
                                        )}
                                        <tr>
                                            <td>{championshipResults.rank}</td>
                                            <td>{championshipResults.fullname}</td>
                                            {normalizedPoints.map((point, index) => (
                                                <td key={index}>{point}</td>
                                            ))}
                                            <td>{championshipResults.total_points}</td>
                                            <td>{championshipResults.region.name}</td>
                                        </tr>
                                    </>
                                );
                            })}
                        </table>
                        <Pagination className={classes.pagination} onChange={(_, page) => {
                            handlePageChange(page)
                        }} count={maxPages} variant="outlined"></Pagination>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default ChampionshipResults;
