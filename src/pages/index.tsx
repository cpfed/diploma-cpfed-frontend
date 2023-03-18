import Intro from "@/components/pages/index/Intro";
import Container from "@/components/ui/Container";

export default function Home() {
  return (
		<Intro></Intro>
	)
}


export async function getStaticProps() {
	return {
		props: {
			title: 'Cpfed | Home',
			description: 'Cpfed | Home Description',
		},
	}
}