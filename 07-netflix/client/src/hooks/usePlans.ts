import { useEffect, useReducer } from "react";
import axios from "axios";

export interface Plan {
  id: string;
  name: string;
  canDownload: boolean;
  canWatchSouth: boolean;
  price: {
    amount: number;
    id: string;
  };
}

interface State {
  data: Plan[] | null;
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
  | { type: ActionType.SUCCESS; payload: Plan[] }
  | { type: ActionType.FAILED; payload: string };

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

const usePlans = () => {
  const [{ data, loading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    fetchPlansList();
  }, []);

  const fetchPlansList = async () => {
    dispatch({ type: ActionType.LOADING });
    try {
      const response = await axios.get("http://localhost:8080/sub/products");

      dispatch({ type: ActionType.SUCCESS, payload: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: ActionType.FAILED, payload: "Something went wrong" });
    }
  };

  return { data, loading, error };
};

export default usePlans;
