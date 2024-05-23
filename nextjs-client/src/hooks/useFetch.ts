import { useEffect, useReducer, useState } from "react";

interface Action {
  type: "FETCH_INIT" | "FETCH_SUCCESS" | "FETCH_FAILURE";
  payload?: any;
}

// Reducer function to manage state changes based on different actions
const dataFetchReducer = (state: any, action: Action) => {
  switch (action.type) {
    // Set loading state when data fetching starts
    case "FETCH_INIT":
      return { ...state, isLoading: true, isError: false };
    // Set data and reset loading and error states on successful data fetch
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    // Set error state and provide error details on data fetch failure
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload,
      };
    // Throw an error for unknown action types
    default:
      throw new Error();
  }
};

// Custom hook for handling API requests and managing state
const useFetch = (
  initAction: (() => Promise<any>) | null,
  initialData = {}
) => {
  // State for the current API action and a function to update it
  const [action, setAction] = useState(() => initAction);

  // Use a reducer to manage the loading, error, and data states
  const [state, dispatch] = useReducer(dataFetchReducer, {
    // Set initial loading state based on the existence of the initial action
    isLoading: initAction ? true : false,
    isError: false,
    error: {},
    data: initialData,
  });

  useEffect(() => {
    let didCancel = false;

    // Function to fetch data from the API
    const fetchData = async () => {
      if (action) {
        // Set loading state when data fetching starts
        dispatch({ type: "FETCH_INIT" });

        try {
          // Execute the provided API action function
          const result = await action();

          if (!didCancel) {
            // Handle different cases based on the API response code
            switch (result.code) {
              case 555:
              case 200:
              case 201:
              case 400: {
                dispatch({
                  type: "FETCH_SUCCESS",
                  payload: result,
                });
                break;
              }
              case -111:
              case 401:
              case -222: {
                dispatch({ type: "FETCH_SUCCESS", payload: result });
                break;
              }
              case -888: {
                dispatch({ type: "FETCH_FAILURE", payload: result.message });
                break;
              }
              default: {
                dispatch({ type: "FETCH_FAILURE", payload: result });
              }
            }
          }
        } catch (error) {
          console.log(error);

          if (!didCancel) {
            dispatch({ type: "FETCH_FAILURE", payload: error });
          }
        }
      }
    };

    fetchData();

    // Cleanup function to prevent state updates if the component unmounts before the fetch is complete
    return () => {
      didCancel = true;
    };
  }, [action]); // Trigger the effect whenever the action changes

  // Return the current state and a function to update the action
  return [state, setAction];
};

export default useFetch;
