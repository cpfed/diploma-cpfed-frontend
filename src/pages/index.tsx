import dynamic from 'next/dynamic'


export default function Home() {
  return (
		<>
    Hello world
		</>
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