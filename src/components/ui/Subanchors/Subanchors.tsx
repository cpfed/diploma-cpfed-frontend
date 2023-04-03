import Link from "next/link";
import Container from "../Container";
import classes from "./Subanchors.module.scss";
import { LinkElement } from "@/interfaces/linkElement";
import useTranslation from "next-translate/useTranslation";

interface SubanchorsProps {
    anchorsName: LinkElement[];
}

const Subanchors = ({ anchorsName }: SubanchorsProps) => {
    const { t } = useTranslation();

    return (
        <Container>
            <ul className={classes.subanchors}>
                {anchorsName.map((element, index, self) => {
                    return (
                        <li key={index} className={classes.subanchors__item}>
                            <Link href={element.link}>
                                {t(element.title)}
                            </Link>
                            {index == 0 || index != self.length - 1 ? (
                                <span
                                    className={[
                                        classes.subanchors__seperator,
                                    ].join(" ")}
                                >
                                    /
                                </span>
                            ) : <></>}
                        </li>
                    );
                })}
            </ul>
        </Container>
    );
};

export default Subanchors;
