import { useReducer } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

export interface Subscription {
  id: string;
  name: string;
}

interface State {
  data: Subscription | null;
  error: string | null;
  loading: boolean;
}

const cookie = new Cookies();

const initialState: State = {
  data: null,
  error: null,
  loading: true,
};

enum ActionType {
  LOADING,
  SUCCESS,
  FAILED,
}

type Action =
  | { type: ActionType.LOADING }
  | { type: ActionType.SUCCESS; payload: Subscription }
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

type UseSubscription = () => [
  {
    data: Subscription | null;
    loading: boolean;
    error: string | null;
  },
  () => Promise<Subscription>
];

const useSubscriptions: UseSubscription = () => {
  const [{ data, loading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const fetchSubscriptions = async () => {
    dispatch({ type: ActionType.LOADING });

    const sessionToken = cookie.get("session_token");
    try {
      const response = await axios.get(
        "http://localhost:8080/sub/subscription",
        {
          headers: {
            ...(sessionToken
              ? { Authorization: `Bearer ${sessionToken}` }
              : null),
          },
        }
      );

      dispatch({ type: ActionType.SUCCESS, payload: response.data });
      return response.data;
    } catch (error) {
      console.log(error);
      dispatch({ type: ActionType.FAILED, payload: "Something went wrong" });
    }
  };

  return [{ data, loading, error }, fetchSubscriptions];
};

export default useSubscriptions;
