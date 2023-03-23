import Credentials from "@/components/pages/index/Profile/Credentials";

export default function Home() {
    return (
        <>
            <Credentials></Credentials>
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
