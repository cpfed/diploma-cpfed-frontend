import Intro from "@/components/pages/index/Championship/Intro";
import Rules from "@/components/pages/index/Championship/Rules";
import Scoring from "@/components/pages/index/Championship/Scoring";
import Subanchors from "@/components/ui/Subanchors";
import { LinkElement } from "@/interfaces/linkElement";

const subanchors: LinkElement[] = [
	{
		title: "subanchors:championship-intro",
		link: "#intro"
	},
	{
		title: "subanchors:championship-rules",
		link: "#rules"
	},
	{
		title: "subanchors:championship-scoring",
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