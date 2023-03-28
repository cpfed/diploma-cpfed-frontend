import Handles from "@/components/pages/index/Profile/Handles";
import PersonalInfo from "@/components/pages/index/Profile/PersonalInfo";
import { LinkElement } from "@/interfaces/linkElement";


export default function Home() {
    return (
        <>
            <PersonalInfo></PersonalInfo>
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
