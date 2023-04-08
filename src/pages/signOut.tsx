import { API } from "@/api/cpdefAPI";
import { useRouter } from "next/router"
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();
    useEffect(()=>{
        API.signOut()
        .finally(
            ()=>{
                router.push("/");
            }
        )
    },)
    return <>
  	    </>
}


export async function getStaticProps() {
	return {
		props: {
			title: 'Cpfed | SignOut',
			description: 'Cpfed | SignOut Description',
		},
	}
}