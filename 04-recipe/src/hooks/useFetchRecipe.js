import axios from "axios";
import { useReducer } from "react";

const options = {
  method: 'GET',
  url: 'https://tasty.p.rapidapi.com/recipes/get-more-info',
  params: {
    from: '0',
    size: '20'
  },
  headers: {
    'x-rapidapi-key': 'b824a820e2mshf761d4c413726c9p1718f1jsncc8a7e6cdff7',
    'x-rapidapi-host': 'tasty.p.rapidapi.com'
  }
};

const initialState = {
  data: null,
  loading: false,
  error: null
}

const useFetchRecipe = () => {

  const Actions = {
    FETCHING_DATA: "FETCHING_DATA",
    FETCH_SUCCESSFUL: "FETCH_SUCCESSFUL",
    FETCH_ERROR: "FETCH_ERROR"
  }

  const reducer = (_, action) => {
    switch (action.type) {
      case Actions.FETCHING_DATA:
        return {
          data: null,
          error: null,
          loading: true
        };
      case Actions.FETCH_SUCCESSFUL:
        return {
          data: action.payload,
          error: null,
          loading: false
        };
      case Actions.FETCH_ERROR:
        return {
          data: null,
          error: action.payload,
          loading: false
        }
      default:
        return initialState;
    }
  }

  const [{ data, loading, error }, dispatch] = useReducer(reducer, initialState);

  const fetchRecipe = async (id) => {

    dispatch({ type: Actions.FETCHING_DATA })

    try {
      const reqOptions = { ...options }
      reqOptions.params.id = id

      const response = await axios.request(options);
      dispatch({ type: Actions.FETCH_SUCCESSFUL, payload: response.data })

    } catch (err) {
      console.error(err);
      dispatch({ type: Actions.FETCH_ERROR, payload: err.message })
    }
  }

  return [fetchRecipe, { data: data, loading, error }]

}

export default useFetchRecipe;