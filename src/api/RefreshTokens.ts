import { ENDPOINTS } from "./apiConfiguration";
import api from "./axios";

export const refreshToken = async () => {
  try {
    const response = await api.post(ENDPOINTS.AUTH.REFRESH_TOKENS, {
      refreshToken: typeof window !== "undefined" ? window.localStorage.getItem("refreshToken") : ''
    });

    // Ensure the response structure is correctly accessed
    const { access, refresh } = response.data.data.tokens; // Destructure tokens directly

    // Store the new tokens in local storage
    if (typeof window !== "undefined") {
      window.localStorage.setItem("accessToken", access.token);
      window.localStorage.setItem("refreshToken", refresh.token);
    }

    console.log("Tokens refreshed!");
    return access.token; // Return the new access token
  } catch (error: any) {
    console.error("Failed to refresh token:", error.response ? error.response.data : error.message);
    throw error; // Rethrow the error for further handling
  }
};