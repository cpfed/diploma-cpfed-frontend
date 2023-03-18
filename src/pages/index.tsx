import Intro from "@/components/pages/index/Intro";
import PassOrder from "@/components/pages/index/PassOrder";
import FAQ from "@/components/pages/index/FAQ";

export default function Home() {
  return <>
	<Intro></Intro>
	<PassOrder></PassOrder>
	<FAQ></FAQ>
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