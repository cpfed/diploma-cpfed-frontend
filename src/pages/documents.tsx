import Documents from "@/components/pages/index/Documents";

export default function Home() {
  return <>
		<Documents></Documents>
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