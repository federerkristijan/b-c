import { sanityClient, urlFor, PortableText } from "../../lib/sanity";

const recipeQuery = `*[_type == "recipe" && slug.current == $slug][0]{
  _id,
  name,
  slug,
  mainImage{
    asset->{
      _id,
      url
    }
  },
  ingredient[]{
    unit,
    wholeNumber,
    fraction,
    ingredient->{
      name
    }
  },
  instructions
}`;

export default function OneRecipe() {}

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
