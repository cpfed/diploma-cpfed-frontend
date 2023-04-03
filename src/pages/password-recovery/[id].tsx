import Recover from "@/components/pages/index/Recover";

export default function Home() {
  return <>
		<Recover></Recover>
  	</>
}


export async function getServerStaticProps() {
	return {
		props: {
			title: 'Cpfed | Password recovery',
			description: 'Cpfed | Password recovery description',
		},
	}
}