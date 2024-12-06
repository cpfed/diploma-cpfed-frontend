import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("https://auth.cpfed.kz");
  }, []);

  return null;
}

export async function getStaticProps() {
  return {
    props: {
      title: 'Cpfed | Login',
      description: 'Cpfed | Login Description',
    },
  };
}