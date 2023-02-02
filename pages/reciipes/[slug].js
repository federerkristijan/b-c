import Image from "next/image";
import { sanityClient, urlFor, PortableText } from "../../lib/sanity";

const recipeQuery = `*[_type == "recipe" && slug.current == $slug][0]{
  _id,
  name,
  slug,
  mainImage,
  ingredient[]{
    _key,
    unit,
    wholeNumber,
    fraction,
    ingredient->{
      name
    }
  },
  instructions
}`;

export default function OneRecipe({ data }) {
  const { recipe } = data;

  return (
    <article>
      <h1>{recipe.name}</h1>
      <main>
        <Image />
        <div>
          <ul>
            <li>

            </li>
          </ul>
          <h3>Instructions</h3>
        </div>
      </main>
    </article>
  )
}

export async function getStaticPaths() {
  const pats = await sanityClient.fetch(
    `*[_typ == "recipe" && defined(slug.current)]{
      "params": {
        "slug": slug.current
      }
    }`
  );

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;

  const recipe = await sanityClient.fetch(recipeQuery, { slug });

  return {
    props: {
      data: {
        recipe,
      },
    },
  };
}
