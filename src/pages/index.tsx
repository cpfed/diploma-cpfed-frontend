import Intro from "@/components/pages/index/Intro";
import About from "@/components/pages/index/About";
import Container from "@/components/ui/Container";

export default function Home() {
  return <>
		<Intro></Intro>
		<About></About>
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