import { useParams } from "react-router-dom"
import useFetchRecipe from "../hooks/useFetchRecipe";
import { useEffect } from "react";
import RecipeHeader from "../components/RecipeHeader";
import Loading from "../components/Loading";
import RecipeInfo from "../components/RecipeInfo";
import Error from "../components/Error";

export default function RecipePage() {

  const { id } = useParams();
  const [fetchRecipe, { data, loading, error }] = useFetchRecipe()

  useEffect(() => {
    fetchRecipe(id)
  }, [])

  console.log("🚀 ~ RecipePage ~ {data, loading, error}:", { data, loading, error });
  if (loading) return <Loading />;
  if (error) return <h1>{error}</h1>;
  if (data?.errors) return <Error explanation="Recipe not found" />;
  return (
    <div>
      {data && <>
        <RecipeHeader nutritionalFacts={data.nutrition} name={data.name} />
        <RecipeInfo
          instructions={data.instructions}
          ingredients={data.sections[0].components}
          image={data.thumbnail_url} />
      </>}
    </div>);
}
