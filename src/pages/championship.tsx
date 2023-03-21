import Intro from "@/components/pages/index/Championship/Intro";
import Rules from "@/components/pages/index/Championship/Rules";
import Scoring from "@/components/pages/index/Championship/Scoring";

export default function Home() {
  return <>
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