import SignUp from "@/components/pages/index/SignUp";

export default function Home() {
  return <SignUp></SignUp>
}


export async function getStaticProps() {
	return {
		props: {
			title: 'Cpfed | SignUp',
			description: 'Cpfed | SignUp Description',
		},
	}
}