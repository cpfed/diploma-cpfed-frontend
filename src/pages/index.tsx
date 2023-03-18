import Intro from "@/components/pages/index/Intro";
import About from "@/components/pages/index/About";
import Benefits from "@/components/pages/index/Benefits";

export default function Home() {
  return <>
		<Intro></Intro>
		<About></About>
		<Benefits></Benefits>
	</>
}


export async function getStaticProps() {
	return {
		props: {
			title: 'Cpfed | Home',
			description: 'Cpfed | Home Description',
		},
	}
}