import useState from "react";
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
  instructions,
  likes
}`;

export default function OneRecipe({ preview, data: initialData }) {
  const data = preview(null, recipeQuery)

  const [likes, setLikes] = useState(data?.recipe?.likes);

  async function addLike() {
    const res = await ("/api/handle-like",
    {
      method: "POST",
      body: JSON.stringify({ _id: recipe._id }),
    }).catch((error) => console.log(error));

    const data = await res.json();

    setLikes(data.likes);
  }

  return (
    <article>
      <h1>{recipe.name}</h1>

      <button className="like-button" onClick={addLike}>
        {likes} ❤️
      </button>

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
          <PortableText value={recipe?.instructions} className="instructions" />
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
      preview: true
    },
  };
}
