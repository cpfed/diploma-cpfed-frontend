import Profile from "@/components/pages/index/Profile";

export default function Home() {
  return <Profile></Profile>
}


export async function getStaticProps() {
	return {
		props: {
			title: 'Cpfed | Profile',
			description: 'Cpfed | Profile Description',
		},
	}
}