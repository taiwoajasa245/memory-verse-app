
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function api(endpoint: string, options?: RequestInit) {
  const url = `${BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  };

  try {

    const response = await fetch(url, config);
    console.log("Calling API at:", BASE_URL, "endpoint:", endpoint);


    // if (!response.ok) {
    //   if (response.status === 401) {
    //     throw new Error("Unauthorized: Please log in again.");
    //   } else if (response.status === 403) {
    //     throw new Error("Forbidden: You do not have permission to access this resource.");
    //   } else if (response.status === 500) {
    //     throw new Error("Server Error: Please try again later.");
    //   } else if (response.status === 404) {
    //     throw new Error("Not Found: The requested resource could not be found.");
    //   }
    //   throw new Error(`${response.statusText}`);
    // }

    const data = await response.json();

    if (data.success === false) {
      throw new Error(data.message || "API Error");
    }

    return data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
}