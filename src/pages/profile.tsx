import Handles from "@/components/pages/index/Profile/Experience/Handles";
import PersonalInfo from "@/components/pages/index/Profile/PersonalInfo";

export default function Home() {
    return (
        <>
            <PersonalInfo></PersonalInfo>
            {/* <Handles></Handles> */}
            {/* <Experience></Experience> */}
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
