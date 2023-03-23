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
		title: "Главная",
		link: "#intro"
	},
	{
		title: "О Чемпионате",
		link: "#about"
	},
	{
		title: "Преимущества",
		link: "#benefits"
	},
	{
		title: "Порядок прохождения",
		link: "#passOrder"
	},
	{
		title: "Вопрос-Ответ",
		link: "#faq"
	},
	{
		title: "Полезные документы",
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