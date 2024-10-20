import { useEffect, useReducer } from "react";
import axios from "axios";
import { Movie } from "../types.ts";
import Cookies from "universal-cookie";

interface State {
  data: Movie | null;
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
  | { type: ActionType.SUCCESS; payload: Movie }
  | { type: ActionType.FAILED; payload: string };

const cookie = new Cookies();
const reducer = (_: State, action: Action): State => {
  switch (action.type) {
    case ActionType.LOADING:
      return {
        data: null,
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

const useMovie = (id: string) => {
  const [{ data, loading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    dispatch({ type: ActionType.LOADING });
    try {
      const sessionToken = cookie.get("session_token");
      const response = await axios.get(`http://localhost:8080/movie/${id}`, {
        headers: {
          ...(sessionToken
            ? { Authorization: `Bearer ${sessionToken}` }
            : null),
        },
      });

      dispatch({ type: ActionType.SUCCESS, payload: response.data });
    } catch (error: any) {
      console.log(error);
      dispatch({
        type: ActionType.FAILED,
        payload: error?.response?.data?.errors[0].msg,
      });
    }
  };

  return { data, loading, error };
};

export default useMovie;
