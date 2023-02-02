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
  }
}`;

export default function OneRecipe() {};

export async function getStaticPaths() {};

export async function getStaticProps() {};
