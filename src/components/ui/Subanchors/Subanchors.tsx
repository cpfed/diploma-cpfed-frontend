import Link from "next/link";
import Container from "../Container";
import classes from "./Subanchors.module.scss";
import { LinkElement } from '@/interfaces/linkElement'

interface SubanchorsProps {
    anchorsName: LinkElement[];
}

const Subanchors = ({ anchorsName }: SubanchorsProps) => {
    return (
        <Container>
            <ul className={classes.subanchors}>
                {anchorsName.map((element, index, self) => {
                    return (
                        <>
                            <li
                                key={index}
                                className={classes.subanchors__item}
                            >
                                <Link href={element.link}>{element.title}</Link>
                            </li>
                            {index == 0 || index != self.length - 1 ? (
                                <li
                                    className={[
                                        classes.subanchors__seperator,
                                        classes.subanchors__item,
                                    ].join(" ")}
                                >
                                    /
                                </li>
                            ) : undefined}
                        </>
                    );
                })}
            </ul>
        </Container>
    );
};

export default Subanchors;
