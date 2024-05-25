/**
 * Request Wrapper with default success/error actions
 */
const request = async function (options: any) {
  const onSuccess = async function (response: Response) {
    if (response.ok) {
      const responseData = await response.json();
      return { code: response.status, ...responseData };
    }
    throw new Error(`Request failed with status ${response.status}`);
  };

  const onError = function (error: Error) {
    console.error("Request Failed:", error.message);
    return Promise.reject(error.message);
  };

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + options.url,
      {
        method: options.method || "GET",
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
      }
    );

    return onSuccess(response);
  } catch (error: any) {
    return onError(error);
  }
};

export default request;
