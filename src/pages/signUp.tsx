import Registration from "@/components/pages/index/Registration";

export default function Home() {
  return <>
  	<Registration></Registration> 
  </>
}


export async function getStaticProps() {
	return {
		props: {
			title: 'Cpfed | SignUp',
			description: 'Cpfed | SignUp Description',
		},
	}
}