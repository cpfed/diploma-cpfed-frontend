import Handles from "@/components/pages/index/Profile/Handles";
import { LinkElement } from "@/interfaces/linkElement";


export default function Home() {
    return (
        <>
            <Handles></Handles>
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
