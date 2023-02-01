import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { sanityClient, urlFor } from "@/lib/sanity";

const inter = Inter({ subsets: ["latin"] });

const recipesQuery = `*[_type == "recipe"]{
  _id,
  name,
  slug,
  mainImage
}`;

export default function Home({ recipes }) {
  return (
    <>
      <Head>
        <title>Burner Cookbook</title>
        <meta name="description" content="Burner cookbook" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <h1>Welcome to the burner cookbook</h1>
          <ul>
            {recipes?.length > 0 && recipes.map((recipe) =>
            (
            <li key={recipe._id}>
              <Link href="/about">
                <Image src={urlFor(recipe.mainImage).url()} alt="" width={250} height={250} />
                <span></span>
              </Link>
            </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const recipes = await sanityClient.fetch(recipesQuery);

  return {
    props: {
      recipes,
    },
  };
}
