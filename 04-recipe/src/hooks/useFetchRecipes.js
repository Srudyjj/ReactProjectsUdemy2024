import axios from "axios";
import { useEffect, useState } from "react";



const options = {
  method: 'GET',
  url: 'https://tasty.p.rapidapi.com/recipes/list',
  params: {
    from: '0',
    size: '20'
  },
  headers: {
    'x-rapidapi-key': 'b824a820e2mshf761d4c413726c9p1718f1jsncc8a7e6cdff7',
    'x-rapidapi-host': 'tasty.p.rapidapi.com'
  }
};

const useFetchRecipes = () => {

  const [recipes, setRecipes] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecipes = async (searchTerm) => {
    setLoading(true)
    setRecipes(null)
    setError(null)
    try {
      const reqOptions = { ...options }
      if (searchTerm) {
        reqOptions.params.q = searchTerm
      }
      const response = await axios.request(options);
      setRecipes(response.data.results)
      setLoading(false)
    } catch (err) {
      console.error(err);
      setLoading(false)
      setError(err.message)
    }
  }

  return [fetchRecipes, {data: recipes, loading, error}]

}

export default useFetchRecipes;