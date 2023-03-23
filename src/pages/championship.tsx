import Intro from "@/components/pages/index/Championship/Intro";
import Rules from "@/components/pages/index/Championship/Rules";
import Scoring from "@/components/pages/index/Championship/Scoring";
import Subanchors from "@/components/ui/Subanchors";
import { LinkElement } from "@/interfaces/linkElement";

const subanchors: LinkElement[] = [
	{
		title: "Правила чемпионата",
		link: "#intro"
	},
	{
		title: "Порядок проведения Чемпионата",
		link: "#rules"
	},
	{
		title: "Порядок начисления очков Чемпионата",
		link: "#scoring"
	}
]

export default function Home() {
  return <>
	<Subanchors anchorsName={subanchors} />
  	<Intro></Intro>
  	<Rules></Rules>
	<Scoring></Scoring>
  </> 
}


export async function getStaticProps() {
	return {
		props: {
			title: 'Cpfed | Championship',
			description: 'Cpfed | Championship Description',
		},
	}
}