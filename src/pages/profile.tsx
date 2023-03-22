import Experience from "@/components/pages/index/Profile/Experience";

export default function Home() {
  return <Experience></Experience>
}


export async function getStaticProps() {
	return {
		props: {
			title: 'Cpfed | Profile',
			description: 'Cpfed | Profile Description',
		},
	}
}