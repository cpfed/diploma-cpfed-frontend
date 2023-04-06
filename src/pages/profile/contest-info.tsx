import ContestInfo from "@/components/pages/index/Profile/ContestInfo";


export default function Home() {
    return (
        <>
            <ContestInfo></ContestInfo>
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
