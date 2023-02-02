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
      <main className="content">
        <Image
          src={urlFor(recipe?.mainImage).url()}
          alt={recipe.name}
          width={280}
          height={280}
        />
        <div className="breakdown">
          <ul className="ingredients">
            {recipe.ingredient?.map((ingredient) => (
              <li key={ingredient._key} className="ingredient">
                {ingredient?.wholeNumber}
                {ingredient?.fraction} {ingredient?.unit}
                <br />
                {ingredient?.ingredient?.name}
              </li>
            ))}
          </ul>
          <h3>Instructions</h3>
        </div>
      </main>
    </article>
  );
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
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
