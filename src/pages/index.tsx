import Intro from "@/components/pages/index/Intro";
import PassOrder from "@/components/pages/index/PassOrder";
import FAQ from "@/components/pages/index/FAQ";
import About from "@/components/pages/index/About";
import Benefits from "@/components/pages/index/Benefits";
import Documents from "@/components/pages/index/Documents";
import Subanchors from "@/components/ui/Subanchors";
import { LinkElement } from "@/interfaces/linkElement";

const subanchors: LinkElement[] = [
	{
		title: "subanchors:intro-main",
		link: "#intro"
	},
	{
		title: "subanchors:intro-about",
		link: "#about"
	},
	{
		title: "subanchors:intro-benefits",
		link: "#benefits"
	},
	{
		title: "subanchors:intro-passOrder",
		link: "#passOrder"
	},
	{
		title: "subanchors:intro-faq",
		link: "#faq"
	},
	{
		title: "subanchors:intro-documents",
		link: "#documents"
	}
]

export default function Home() {
  return <>
		<Subanchors anchorsName={subanchors} />
		<Intro></Intro>
		<About></About>
		<Benefits></Benefits>
		<PassOrder></PassOrder>
		<FAQ></FAQ>
		<Documents></Documents>
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