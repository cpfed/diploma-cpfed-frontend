import { API } from "@/api/cpdefAPI";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { logout } from "@/store/account/thunk";
import { useRouter } from "next/router"
import { useEffect } from "react";

export default function Home() {
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(()=>{
        dispatch(logout())
        .unwrap()
        .finally(()=>{
            router.push("/");
        })
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