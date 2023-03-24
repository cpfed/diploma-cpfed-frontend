import Credentials from "@/components/pages/index/Profile/Credentials";
import Handles from "@/components/pages/index/Profile/Experience/Handles";

export default function Home() {
    return (
        <>
            <Credentials></Credentials>
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
