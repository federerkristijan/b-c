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

          <h1>Welcome to the burner cookbook</h1>
          <ul className="recipes-list">
            {recipes?.length > 0 && recipes.map((recipe) =>
            (
            <li key={recipe._id} className="recipe-card">
              <Link href={`/recipes/${recipe.slug.current}`} className="recipe-link">
                <Image src={urlFor(recipe.mainImage).url()} alt={recipe.name} width={250} height={250} className="recipe-image"/>
                <span>{recipe.name}</span>
              </Link>
            </li>
            ))}
          </ul>
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
