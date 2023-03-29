import Olympiads from "@/components/pages/index/Profile/Olympiads";
import { LinkElement } from "@/interfaces/linkElement";


export default function Home() {
    return (
        <>
            <Olympiads></Olympiads>
        </>
    );
}

export async function getStaticProps() {
    return {
        props: {
            title: "Cpfed | Profile",
            description: "Cpfed | Profile Description",
        },
    };
}
