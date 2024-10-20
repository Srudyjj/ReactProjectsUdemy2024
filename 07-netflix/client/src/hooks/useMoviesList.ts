import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { Movie } from "../types.ts";
import Cookies from "universal-cookie";

interface State {
  data: Movie[] | null;
  error: string | null;
  loading: boolean;
}

const initialState: State = {
  data: null,
  error: null,
  loading: false,
};

enum ActionType {
  LOADING,
  SUCCESS,
  FAILED,
}

type Action =
  | { type: ActionType.LOADING }
  | { type: ActionType.SUCCESS; payload: Movie[] }
  | { type: ActionType.FAILED; payload: string };

const cookie = new Cookies();

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.LOADING:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case ActionType.FAILED:
      return {
        data: null,
        error: action.payload,
        loading: false,
      };
    case ActionType.SUCCESS:
      return {
        data: action.payload,
        error: null,
        loading: false,
      };
    default:
      return initialState;
  }
};

const useMoviesList = (offset: number) => {
  const [{ data, loading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetchMoviesList();
  }, [offset]);

  const fetchMoviesList = async () => {
    if (data && count && data.length >= count) return;
    dispatch({ type: ActionType.LOADING });
    try {
      const sessionToken = cookie.get("session_token");
      const response = await axios.get(
        `http://localhost:8080/movies/list?offset=${offset}`,
        {
          headers: {
            ...(sessionToken
              ? { Authorization: `Bearer ${sessionToken}` }
              : null),
          },
        }
      );
      const moviesData = data
        ? [...data, ...response.data.movies]
        : response.data.movies;
      setCount(response.data.count);
      dispatch({ type: ActionType.SUCCESS, payload: moviesData });
    } catch (error: any) {
      dispatch({
        type: ActionType.FAILED,
        payload: error?.response?.data?.errors[0].msg,
      });
    }
  };

  return { data, loading, error };
};

export default useMoviesList;
