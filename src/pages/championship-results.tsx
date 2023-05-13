import ChampionshipResults from "@/components/pages/index/ChampionshipResults";

export default function Home() {
  return <>
		<ChampionshipResults></ChampionshipResults>
  	</>
}


export async function getStaticProps() {
	return {
		props: {
			title: 'Cpfed | Login',
			description: 'Cpfed | Login Description',
		},
	}
}