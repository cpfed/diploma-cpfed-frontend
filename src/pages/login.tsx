import Login from "@/components/pages/index/Login";

export default function Home() {
  return <>
		<Login></Login>
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