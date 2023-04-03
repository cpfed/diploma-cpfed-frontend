import ForgotPassword from "@/components/pages/index/ForgotPassword";

export default function Home() {
  return <>
		<ForgotPassword></ForgotPassword>
  	</>
}


export async function getStaticProps() {
	return {
		props: {
			title: 'Cpfed | ForgotPassword',
			description: 'Cpfed | ForgotPassword Description',
		},
	}
}